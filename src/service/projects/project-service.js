import { prismaClient } from '../../application/database.js';
import { ApiError } from '../../utils/apiError-utils.js';
import { StatusCodes } from 'http-status-codes';
import { validate } from '../../validation/validation.js';
import { projectValidation } from '../../validation/project-validation.js';
import slugify from 'slugify';
import cloudinaryServices from '../cloudinary/cloudinary-services.js';

const MAX_FILE_SIZE = 10 * 1024 * 1024; 
const MAX_FILE_COUNT = 8;
const allowedMimeTypes = [
  'image/jpeg', 'image/png', 'image/webp',
  'video/mp4', 'video/webm', 'video/ogg',
];

const createProject = async (request) => {
  const { userId, title, description, tags, detail = {}, fileBanners = [] } = request;

  if (fileBanners.length > MAX_FILE_COUNT)
    throw new ApiError(StatusCodes.BAD_REQUEST, `Maksimal file banner adalah ${MAX_FILE_COUNT}`);

  for (const file of fileBanners) {
    if (file.size > MAX_FILE_SIZE)
      throw new ApiError(StatusCodes.BAD_REQUEST, `File "${file.name || 'unknown'}" melebihi ukuran maksimal 10 MB`);
    if (!allowedMimeTypes.includes(file.mimetype))
      throw new ApiError(StatusCodes.BAD_REQUEST, `Format file "${file.name || 'unknown'}" tidak didukung. Hanya gambar atau video yang diizinkan.`);
  }

  const slug = slugify(title, { lower: true, strict: true });

  let banners = [];
  if (fileBanners.length) {
    banners = await Promise.all(
      fileBanners.map(async (file, idx) => {
        const resourceType = file.mimetype.startsWith('video') ? 'video' : 'image';
        const filename = `${slug}-banner-${Date.now()}-${idx}`;
        const uploadResult = await cloudinaryServices.uploadToCloudinary('projects/banners', file, filename, resourceType);
        return {
          url: uploadResult.fileUrl,
          publicId: uploadResult.publicId,
        };
      })
    );
  }

  const detailWithBanners = { ...detail, banners, title };

  await validate(projectValidation, {
    title,
    description,
    tags,
    detail: detailWithBanners,
  });

  const existing = await prismaClient.project.findUnique({ where: { slug } });
  if (existing)
    throw new ApiError(StatusCodes.CONFLICT, 'Judul proyek sudah digunakan, coba judul lain');

  const project = await prismaClient.$transaction(async (tx) => {
    const createdProject = await tx.project.create({
      data: { userId, title, slug, description, tags },
    });

    const createdDetail = await tx.detailProject.create({
      data: {
        projectId: createdProject.id,
        userId,
        title,
        contentHtml: detail.contentHtml || '',
        status: detail.status || 'PUBLISHED',
        repository: detail.repository || null,
        banners,
      },
    });

    return {
      ...createdProject,
      detail: createdDetail,
    };
  });

  return project;
};

const updateProject = async (id, request) => {
  const { title, description, tags, detail = {}, fileBanners = [] } = request;

  if (fileBanners.length > MAX_FILE_COUNT)
    throw new ApiError(StatusCodes.BAD_REQUEST, `Maksimal file banner adalah ${MAX_FILE_COUNT}`);

  const project = await prismaClient.project.findUnique({ where: { id } });
  if (!project) throw new ApiError(StatusCodes.NOT_FOUND, 'Project tidak ditemukan');

  for (const file of fileBanners) {
    if (file.size > MAX_FILE_SIZE)
      throw new ApiError(StatusCodes.BAD_REQUEST, `File "${file.name || 'unknown'}" melebihi ukuran maksimal 10 MB`);
    if (!allowedMimeTypes.includes(file.mimetype))
      throw new ApiError(StatusCodes.BAD_REQUEST, `Format file "${file.name || 'unknown'}" tidak didukung. Hanya gambar atau video yang diizinkan.`);
  }

  const parsedTags = typeof tags === 'string'
    ? tags.split(',').map(t => t.trim()).filter(Boolean)
    : tags || [];

  let slug = project.slug;
  if (title && title !== project.title) {
    slug = slugify(title, { lower: true, strict: true });
    const existing = await prismaClient.project.findUnique({ where: { slug } });
    if (existing && existing.id !== id)
      throw new ApiError(StatusCodes.CONFLICT, 'Judul proyek sudah digunakan, coba judul lain');
  }

  let banners = [];
  if (fileBanners.length) {
    const detailProject = await prismaClient.detailProject.findUnique({ where: { projectId: id } });
    if (detailProject?.banners?.length) {
      await Promise.all(detailProject.banners.map(b =>
        cloudinaryServices.deleteFromCloudinary(b.publicId, 'auto')
      ));
    }

    banners = await Promise.all(
      fileBanners.map(async (file, idx) => {
        const resourceType = file.mimetype.startsWith('video') ? 'video' : 'image';
        const filename = `${slug}-banner-${Date.now()}-${idx}`;
        const uploadResult = await cloudinaryServices.uploadToCloudinary('projects/banners', file, filename, resourceType);
        return {
          url: uploadResult.fileUrl,
          publicId: uploadResult.publicId,
        };
      })
    );
  } else {
    const detailProject = await prismaClient.detailProject.findUnique({ where: { projectId: id } });
    banners = detailProject?.banners || [];
  }

  const detailWithBanners = { ...detail, banners, title: title || project.title };

  await validate(projectValidation, {
    title: title || project.title,
    description: description || project.description,
    tags: parsedTags,
    detail: detailWithBanners,
  });

  const updated = await prismaClient.$transaction(async (tx) => {
    const updatedProject = await tx.project.update({
      where: { id },
      data: { title, slug, description, tags: parsedTags },
    });

    const updatedDetail = await tx.detailProject.update({
      where: { projectId: id },
      data: {
        title: title || project.title,
        contentHtml: detail.contentHtml,
        status: detail.status,
        repository: detail.repository,
        banners,
      },
    });

    return {
      ...updatedProject,
      detail: updatedDetail,
    };
  });

  return updated;
};

const getAllProject = async (page = 1, limit = 5, userId) => {
  const skip = (page - 1) * limit;
  const where = userId ? { userId } : {};

  const [projects, total] = await prismaClient.$transaction([
    prismaClient.project.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { detail: true, user: true },
    }),
    prismaClient.project.count({ where }),
  ]);

  return {
    data: projects,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getDetailProjectBySlug = async (slug) => {
  const project = await prismaClient.project.findUnique({
    where: { slug },
    include: { detail: true, user: true },
  });

  if (!project) throw new ApiError(StatusCodes.NOT_FOUND, 'Project tidak ditemukan');

  return project;
};

const deleteProject = async (id) => {
  const project = await prismaClient.project.findUnique({
    where: { id },
    include: { detail: true },
  });

  if (!project) throw new ApiError(StatusCodes.NOT_FOUND, 'Project tidak ditemukan');

  if (project.detail?.banners?.length) {
    await Promise.all(project.detail.banners.map(b =>
      cloudinaryServices.deleteFromCloudinary(b.publicId, 'image')
    ));
  }

  await prismaClient.$transaction([
    prismaClient.detailProject.delete({ where: { projectId: id } }),
    prismaClient.project.delete({ where: { id } }),
  ]);

  return true;
};

export default {
  createProject,
  updateProject,
  getAllProject,
  getDetailProjectBySlug,
  deleteProject,
};
