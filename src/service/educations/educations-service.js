import { prismaClient } from '../../application/database.js';
import { ApiError } from '../../utils/apiError-utils.js';
import { StatusCodes } from 'http-status-codes';
import { validate } from '../../validation/validation.js';
import { educationValidation } from '../../validation/education-validation.js';
import { getPagination } from '../../utils/base-func-utils.js';

/**
 * @function createEducation
 * @description Membuat data pendidikan baru
 * @param {Object} request - Data input pendidikan
 * @returns {Promise<Object>} Data pendidikan yang dibuat
 */
const createEducation = async (userId ,request) => {
  validate(educationValidation, {
    institution: request.institution,
    program: request.program,
    degree: request.degree,
    educationType: request.educationType,
    location: request.location,
    startDate: request.startDate,
    endDate: request.endDate,
    description: request.description,
  });

  if (!userId) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User ID wajib diisi');
  }

  return prismaClient.education.create({
    data: {
      userId: userId,
      institution: request.institution,
      program: request.program,
      degree: request.degree,
      educationType: request.educationType,
      location: request.location,
      startDate: new Date(request.startDate),
      endDate: request.endDate ? new Date(request.endDate) : null,
      description: request.description,
    },
  });
};

/**
 * @function updateEducation
 * @description Memperbarui data pendidikan berdasarkan ID
 * @param {string} id - ID pendidikan
 * @param {Object} request - Data yang diperbarui
 * @returns {Promise<Object>} Data pendidikan yang diperbarui
 */
const updateEducation = async (id, request) => {
  const filteredRequest = {
    institution: request.institution,
    program: request.program,
    degree: request.degree,
    educationType: request.educationType,
    location: request.location,
    startDate: request.startDate,
    endDate: request.endDate,
    description: request.description,
  };

  validate(educationValidation, filteredRequest);

  const existing = await prismaClient.education.findUnique({ where: { id } });
  if (!existing) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Education tidak ditemukan');
  }

  return prismaClient.education.update({
    where: { id },
    data: {
      ...filteredRequest,
      startDate: new Date(filteredRequest.startDate),
      endDate: filteredRequest.endDate ? new Date(filteredRequest.endDate) : null,
    },
  });
};

/**
 * @function getAllEducations
 * @description Mengambil seluruh data pendidikan dengan pagination
 * @param {Object} param
 * @param {number} param.page - Nomor halaman
 * @param {number} param.limit - Jumlah data per halaman
 * @param {string} [param.userId] - Filter berdasarkan userId
 * @returns {Promise<Object>} Data dan metadata pagination
 */
const getAllEducations = async ({ page = 1, limit = 5, userId }) => {
  const { skip, limit: take, metadata } = getPagination({ page, limit });
  const whereClause = userId ? { userId } : {};

  const [data, total] = await Promise.all([
    prismaClient.education.findMany({
      where: whereClause,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    }),
    prismaClient.education.count({ where: whereClause }),
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

/**
 * @function deleteEducation
 * @description Menghapus data pendidikan berdasarkan ID
 * @param {string} id - ID pendidikan
 */
const deleteEducation = async (id) => {
  const existing = await prismaClient.education.findUnique({ where: { id } });
  if (!existing) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Education tidak ditemukan');
  }

  await prismaClient.education.delete({ where: { id } });
};

/**
 * @function getEducationByUserId
 * @description Mengambil data pendidikan berdasarkan userId
 * @param {string} userId - ID user
 * @returns {Promise<Array>} Daftar pendidikan
 */
const getEducationByUserId = async (userId) => {
  if (!userId) throw new ApiError(StatusCodes.BAD_REQUEST, 'User ID harus disertakan');

  const educations = await prismaClient.education.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });


  return educations;
};

export default {
  createEducation,
  updateEducation,
  getAllEducations,
  deleteEducation,
  getEducationByUserId,
};
