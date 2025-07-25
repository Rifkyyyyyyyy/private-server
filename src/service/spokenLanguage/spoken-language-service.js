import { prismaClient } from '../../application/database.js';
import { ApiError } from '../../utils/apiError-utils.js';
import { StatusCodes } from 'http-status-codes';
import { validate } from '../../validation/validation.js';
import { spokenLanguageValidation } from '../../validation/spoken-validation.js';
import { getPagination } from '../../utils/base-func-utils.js';

/**
 * @function createSpokenLanguage
 * @description Membuat data bahasa lisan/spoken language baru
 * @param {Object} request
 */
const createSpokenLanguage = async (request) => {
  const { userId, name, level } = request;

  if (!userId) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User ID wajib disertakan');
  }

  validate(spokenLanguageValidation, { name, level });

  return await prismaClient.spokenLanguage.create({
    data: { name, level, userId },
  });
};

/**
 * @function updateSpokenLanguage
 * @description Update data bahasa lisan berdasarkan ID
 * @param {string} id 
 * @param {Object} request 
 */
const updateSpokenLanguage = async (id, request) => {
  const existing = await prismaClient.spokenLanguage.findUnique({ where: { id } });
  if (!existing) throw new ApiError(StatusCodes.NOT_FOUND, 'Spoken language tidak ditemukan');

  const { name, level } = request;
  validate(spokenLanguageValidation, { name, level });

  return await prismaClient.spokenLanguage.update({
    where: { id },
    data: { name, level },
  });
};

/**
 * @function getAllSpokenLanguages
 * @description Ambil data spoken language user dengan pagination
 * @param {number} page 
 * @param {number} limit 
 * @param {string} userId
 */
const getAllSpokenLanguages = async (page = 1, limit = 5, userId) => {
  if (!userId) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User ID wajib disertakan');
  }

  const { skip, limit: take, metadata } = getPagination({ page, limit });

  const [data, total] = await Promise.all([
    prismaClient.spokenLanguage.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    }),
    prismaClient.spokenLanguage.count({ where: { userId } }),
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
 * @function getSpokenLanguagesByUserId
 * @description Ambil semua spoken language berdasarkan userId tanpa pagination
 * @param {string} userId 
 */
const getSpokenLanguagesByUserId = async (userId) => {
  if (!userId) throw new ApiError(StatusCodes.BAD_REQUEST, 'User ID harus disertakan');

  const user = await prismaClient.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User tidak ditemukan dengan ID tersebut');

  const spokenLanguages = await prismaClient.spokenLanguage.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  return spokenLanguages;
};

/**
 * @function deleteSpokenLanguage
 * @description Hapus data spoken language berdasarkan ID
 * @param {string} id 
 */
const deleteSpokenLanguage = async (id) => {
  const existing = await prismaClient.spokenLanguage.findUnique({ where: { id } });
  if (!existing) throw new ApiError(StatusCodes.NOT_FOUND, 'Spoken language tidak ditemukan');

  await prismaClient.spokenLanguage.delete({ where: { id } });
};

export default {
  createSpokenLanguage,
  updateSpokenLanguage,
  getAllSpokenLanguages,
  getSpokenLanguagesByUserId, // perbaikan ekspor nama fungsi
  deleteSpokenLanguage,
};
