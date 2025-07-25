// blog-services.js

import { prismaClient } from '../../application/database.js';
import { ApiError } from '../../utils/apiError-utils.js';
import { StatusCodes } from 'http-status-codes';
import { validate } from '../../validation/validation.js';
import { blogValidation } from '../../validation/blog-validation.js';
import slugify from 'slugify';
import cloudinaryServices from '../cloudinary/cloudinary-services.js';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

const createBlog = async (request) => {
    const { userId, title, summary, detail = {}, coverFile } = request;
  
    if (!coverFile) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'File cover wajib diupload');
    }
  
    if (coverFile.size > MAX_FILE_SIZE)
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Ukuran file cover maksimal 10 MB');
  
    if (!allowedMimeTypes.includes(coverFile.mimetype))
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Format file cover tidak didukung');
  
    const slug = slugify(title, { lower: true, strict: true });
  
    // Upload cover ke Cloudinary
    const filename = `blog-cover-${Date.now()}`;
    const resourceType = 'image';
    const uploadResult = await cloudinaryServices.uploadToCloudinary(
      'blogs/covers',
      coverFile,
      filename,
      resourceType
    );
  
    const cover = {
      url: uploadResult.fileUrl,
      publicId: uploadResult.publicId,
    };
  
    const detailWithSyncedTitle = {
      ...detail,
      title, // sinkronisasi title detail
    };
  
    await validate(blogValidation, {
      title,
      slug,
      summary,
      cover,
      detail: detailWithSyncedTitle,
    });
  
    const existing = await prismaClient.blog.findUnique({ where: { slug } });
    if (existing) throw new ApiError(StatusCodes.CONFLICT, 'Judul blog sudah digunakan');
  
    const blog = await prismaClient.$transaction(async (tx) => {
      const createdBlog = await tx.blog.create({
        data: {
          authorId: userId,
          title,
          slug,
          summary,
          cover,
        },
      });
  
      // thumbnail sama dengan cover
      const createdDetail = await tx.blogDetail.create({
        data: {
          blogId: createdBlog.id,
          title,
          contentHtml: detail.contentHtml,
          thumbail: cover,  // <== pake cover sebagai thumbnail
        },
      });
  
      return {
        ...createdBlog,
        detail: createdDetail,
      };
    });
  
    return blog;
  };
  
  const updateBlog = async (id, request) => {
    const { title, summary, detail = {}, coverFile } = request;
  
    const blog = await prismaClient.blog.findUnique({
      where: { id },
      include: { detail: true },
    });
  
    if (!blog) throw new ApiError(StatusCodes.NOT_FOUND, 'Blog tidak ditemukan');
  
    let slug = blog.slug;
    if (title && title !== blog.title) {
      slug = slugify(title, { lower: true, strict: true });
      const existing = await prismaClient.blog.findUnique({ where: { slug } });
      if (existing && existing.id !== id)
        throw new ApiError(StatusCodes.CONFLICT, 'Judul blog sudah digunakan');
    }
  
    let cover = blog.cover;
  
    if (coverFile) {
      if (coverFile.size > MAX_FILE_SIZE)
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Ukuran file cover maksimal 10 MB');
  
      if (!allowedMimeTypes.includes(coverFile.mimetype))
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Format file cover tidak didukung');
  
      if (cover?.publicId) {
        await cloudinaryServices.deleteFromCloudinary(cover.publicId, 'image');
      }
  
      const filename = `blog-cover-${Date.now()}`;
      const uploadResult = await cloudinaryServices.uploadToCloudinary(
        'blogs/covers',
        coverFile,
        filename,
        'image'
      );
  
      cover = {
        url: uploadResult.fileUrl,
        publicId: uploadResult.publicId,
      };
    }
  
    const detailWithSyncedTitle = {
      ...detail,
      title: title || blog.title,
    };
  
    await validate(blogValidation, {
      title: title || blog.title,
      slug,
      summary,
      cover,
      detail: detailWithSyncedTitle,
    });
  
    const updated = await prismaClient.$transaction(async (tx) => {
      const updatedBlog = await tx.blog.update({
        where: { id },
        data: {
          title,
          slug,
          summary,
          cover,
        },
      });
  
      // thumbnail pakai cover yang terbaru
      const updatedDetail = await tx.blogDetail.update({
        where: { blogId: id },
        data: {
          title: title || blog.title,
          contentHtml: detail.contentHtml,
          thumbail: cover,  // <== pakai cover
        },
      });
  
      return {
        ...updatedBlog,
        detail: updatedDetail,
      };
    });
  
    return updated;
  };

  
const getAllBlogs = async (page = 1, limit = 5) => {
  const skip = (page - 1) * limit;

  const [blogs, total] = await prismaClient.$transaction([
    prismaClient.blog.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { detail: true, author: true },
    }),
    prismaClient.blog.count(),
  ]);

  return {
    data: blogs,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getBlogBySlug = async (slug) => {
  const blog = await prismaClient.blog.findUnique({
    where: { slug },
    include: { detail: true, author: true },
  });

  if (!blog) throw new ApiError(StatusCodes.NOT_FOUND, 'Blog tidak ditemukan');

  return blog;
};

const deleteBlog = async (id) => {
  const blog = await prismaClient.blog.findUnique({
    where: { id },
    include: { detail: true },
  });

  if (!blog) throw new ApiError(StatusCodes.NOT_FOUND, 'Blog tidak ditemukan');

  if (blog.cover?.publicId) {
    await cloudinaryServices.deleteFromCloudinary(blog.cover.publicId, 'image');
  }

  if (blog.detail?.thumbail?.publicId) {
    await cloudinaryServices.deleteFromCloudinary(blog.detail.thumbail.publicId, 'image');
  }

  await prismaClient.$transaction([
    prismaClient.blogDetail.delete({ where: { blogId: id } }),
    prismaClient.blog.delete({ where: { id } }),
  ]);

  
};

export default {
  createBlog,
  updateBlog,
  getAllBlogs,
  getBlogBySlug,
  deleteBlog,
};
