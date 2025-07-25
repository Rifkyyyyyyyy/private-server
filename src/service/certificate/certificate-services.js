import { prismaClient } from '../../application/database.js';
import cloudinaryServices from '../cloudinary/cloudinary-services.js';
import { ApiError } from '../../utils/apiError-utils.js';
import { StatusCodes } from 'http-status-codes';
import { validate } from '../../validation/validation.js';
import { certificateValidation } from '../../validation/certification-validation.js';
import { getPagination } from '../../utils/base-func-utils.js';

// Helper hapus ekstensi file
const removeFileExtension = (filename) => {
  return filename.replace(/\.[^/.]+$/, '');
};

const uploadCertificateFile = async (file, title, type) => {
  if (!file) throw new ApiError(StatusCodes.BAD_REQUEST, 'File tidak boleh kosong');

  const safeTitle = title.trim().replace(/\s+/g, '-');
  const nameWithoutExt = removeFileExtension(file.name.trim());
  const publicId = `certificate-${type}-${safeTitle}-${nameWithoutExt}`;

  // raw untuk dokumen (pdf, dll), image untuk gambar
  const resourceType = type === 'file' ? 'raw' : 'image';

  return cloudinaryServices.uploadToCloudinary('certificates', file, publicId, resourceType);
};

const createCertificate = async (request) => {
  const { userId, title, description, details, file, viewFile } = request;

  // Cek duplikasi judul untuk user
  const existing = await prismaClient.certificate.findFirst({
    where: { userId, title },
  });

  if (existing) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Sertifikat dengan judul ini sudah ada untuk user ini');
  }

  const uploadedPdf = await uploadCertificateFile(file, title, 'file');
  const uploadedImage = await uploadCertificateFile(viewFile, title, 'view');

  const fileJson = {
    publicId: uploadedPdf.publicId,
    fileUrl: uploadedPdf.fileUrlAttachment || uploadedPdf.fileUrl,
  };

  const viewJson = {
    publicId: uploadedImage.publicId,
    fileUrl: uploadedImage.fileUrl,
  };

  try {
    validate(certificateValidation, {
      title,
      description,
      details,
      fileJson,
      viewJson,
    });

    return await prismaClient.certificate.create({
      data: {
        userId,
        title,
        description,
        details,
        fileJson,
        viewJson,
      },
    });
  } catch (err) {
    await cloudinaryServices.deleteFromCloudinary(fileJson.publicId);
    await cloudinaryServices.deleteFromCloudinary(viewJson.publicId);
    throw err;
  }
};

const updateCertificate = async (id, request) => {
  const { userId, title, description, details, file, viewFile } = request;

  const existing = await prismaClient.certificate.findUnique({ where: { id } });
  if (!existing) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Sertifikat tidak ditemukan');
  }

  let fileJson = existing.fileJson;
  let viewJson = existing.viewJson;

  if (file) {
    if (fileJson?.publicId) {
      await cloudinaryServices.deleteFromCloudinary(fileJson.publicId);
    }
    const uploadedPdf = await uploadCertificateFile(file, title, 'file');
    fileJson = {
      publicId: uploadedPdf.publicId,
      fileUrl: uploadedPdf.fileUrlAttachment || uploadedPdf.fileUrl,
    };
  }

  if (viewFile) {
    if (viewJson?.publicId) {
      await cloudinaryServices.deleteFromCloudinary(viewJson.publicId);
    }
    const uploadedImage = await uploadCertificateFile(viewFile, title, 'view');
    viewJson = {
      publicId: uploadedImage.publicId,
      fileUrl: uploadedImage.fileUrl,
    };
  }

  validate(certificateValidation, {
    title,
    description,
    details,
    fileJson,
    viewJson,
  });

  return prismaClient.certificate.update({
    where: { id },
    data: {
      title,
      description,
      details,
      fileJson,
      viewJson,
    },
  });
};

const getAllCertificate = async (page = 1, limit = 5, userId) => {
  const { skip, limit: take, metadata } = getPagination({ page, limit });

  const whereClause = userId ? { userId } : {};

  const [data, total] = await Promise.all([
    prismaClient.certificate.findMany({
      where: whereClause,
      skip,
      take,
      orderBy: { uploadedAt: 'desc' },
      include: { user: { select: { name: true, email: true } } },
    }),
    prismaClient.certificate.count({ where: whereClause }),
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

const deleteCertificate = async (id) => {
  const cert = await prismaClient.certificate.findUnique({ where: { id } });

  if (!cert) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Certificate tidak ditemukan');
  }

  if (cert.fileJson?.publicId) {
    await cloudinaryServices.deleteFromCloudinary(cert.fileJson.publicId);
  }

  if (cert.viewJson?.publicId) {
    await cloudinaryServices.deleteFromCloudinary(cert.viewJson.publicId);
  }

  await prismaClient.certificate.delete({ where: { id } });
};

export default {
  createCertificate,
  updateCertificate,
  getAllCertificate,
  deleteCertificate,
};
