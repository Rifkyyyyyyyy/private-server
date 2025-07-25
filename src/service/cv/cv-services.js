import { prismaClient } from '../../application/database.js';
import cloudinaryServices from '../cloudinary/cloudinary-services.js';
import { ApiError } from '../../utils/apiError-utils.js';
import { StatusCodes } from 'http-status-codes';
import { validate } from '../../validation/validation.js';
import { cvsValidation } from '../../validation/cv-validation.js';
import { getPagination } from '../../utils/base-func-utils.js';

/**
 * Fungsi bantu hapus ekstensi file (misal .pdf)
 */
const removeFileExtension = (filename) => {
  return filename.replace(/\.[^/.]+$/, '');
};

const createCV = async (request) => {
  const { userId, title, description, file, category } = request;

  if (!file) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'File wajib diunggah');
  }

  // Hapus ekstensi dari nama file untuk publicId Cloudinary
  const originalName = file.name.trim().replace(/\s+/g, '-');
  const safeNameWithoutExt = removeFileExtension(originalName);
  const safeFileName = `cv-${safeNameWithoutExt}`;

  let uploadedFile;
  try {
    uploadedFile = await cloudinaryServices.uploadToCloudinary('cvs', file, safeFileName, 'raw');
  } catch {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Gagal mengunggah file ke Cloudinary');
  }

  const fileJson = {
    publicId: uploadedFile.publicId,
    fileUrl: uploadedFile.fileUrlAttachment, // URL dengan flag attachment
  };

  try {
    validate(cvsValidation, { title, description, category, fileJson });

    const existing = await prismaClient.cV.findFirst({ where: { userId, category } });
    if (existing) {
      await cloudinaryServices.deleteFromCloudinary(fileJson.publicId, 'raw');
      throw new ApiError(StatusCodes.BAD_REQUEST, 'CV dengan kategori ini sudah ada');
    }

    return await prismaClient.cV.create({
      data: { userId, title, description, category, fileJson },
    });
  } catch (err) {
    if (fileJson?.publicId) {
      await cloudinaryServices.deleteFromCloudinary(fileJson.publicId, 'raw');
    }
    throw err;
  }
};

const updateCV = async (id, request) => {
  const { title, description, file, category, userId } = request;

  const existing = await prismaClient.cV.findUnique({ where: { id } });
  if (!existing) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'CV tidak ditemukan');
  }

  const finalTitle = title?.trim() || existing.title;
  const finalDescription = description ?? existing.description;
  const finalCategory = category || existing.category;

  let updatedFileJson = existing.fileJson;

  if (file) {
    // Hapus ekstensi dari nama file untuk publicId Cloudinary
    const originalName = file.name.trim().replace(/\s+/g, '-');
    const safeNameWithoutExt = removeFileExtension(originalName);
    const safeFileName = `cv-${safeNameWithoutExt}`;

    try {
      const uploadedFile = await cloudinaryServices.uploadToCloudinary('cvs', file, safeFileName, 'raw');

      if (existing.fileJson?.publicId) {
        await cloudinaryServices.deleteFromCloudinary(existing.fileJson.publicId, 'raw');
      }

      updatedFileJson = {
        publicId: uploadedFile.publicId,
        fileUrl: uploadedFile.fileUrlAttachment,
      };
    } catch {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Gagal mengunggah file baru');
    }
  }

  try {
    validate(cvsValidation, {
      title: finalTitle,
      description: finalDescription,
      category: finalCategory,
      fileJson: updatedFileJson,
    });
  } catch (err) {
    if (file && updatedFileJson?.publicId !== existing.fileJson?.publicId) {
      await cloudinaryServices.deleteFromCloudinary(updatedFileJson.publicId, 'raw');
    }
    throw err;
  }

  return prismaClient.cV.update({
    where: { id },
    data: {
      title: finalTitle,
      description: finalDescription,
      category: finalCategory,
      fileJson: updatedFileJson,
    },
  });
};

const getAllCv = async (page = 1, limit = 5, userId) => {
  const { skip, limit: take, metadata } = getPagination({ page, limit });
  const whereClause = userId ? { userId } : {};

  const [data, total] = await Promise.all([
    prismaClient.cV.findMany({
      where: whereClause,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    }),
    prismaClient.cV.count({ where: whereClause }),
  ]);

  return {
    data,
    metadata: {
      ...metadata,
      total,
      totalPages: Math.ceil(total / metadata.limit),
    },
  };
};

const getCV = async (userId, category) => {
  if (!userId) throw new ApiError(StatusCodes.BAD_REQUEST, 'User ID wajib diisi');
  if (!category) throw new ApiError(StatusCodes.BAD_REQUEST, 'Kategori CV wajib diisi');

  const cv = await prismaClient.cV.findFirst({ where: { userId, category } });
  if (!cv) throw new ApiError(StatusCodes.NOT_FOUND, 'CV tidak ditemukan untuk user dan kategori ini');

  return cv;
};

const deleteCV = async (id) => {
  if (!id) throw new ApiError(StatusCodes.BAD_REQUEST, 'ID CV wajib diisi');

  const existing = await prismaClient.cV.findUnique({ where: { id } });
  if (!existing) throw new ApiError(StatusCodes.NOT_FOUND, 'CV tidak ditemukan');

  if (existing.fileJson?.publicId) {
    await cloudinaryServices.deleteFromCloudinary(existing.fileJson.publicId, 'raw');
  }

  await prismaClient.cV.delete({ where: { id } });
};

export default {
  createCV,
  updateCV,
  getAllCv,
  getCV,
  deleteCV,
};
