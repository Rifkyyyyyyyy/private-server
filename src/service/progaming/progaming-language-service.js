import { prismaClient } from '../../application/database.js';
import { ApiError } from '../../utils/apiError-utils.js';
import { StatusCodes } from 'http-status-codes';
import { validate } from '../../validation/validation.js';
import { programmingLanguageValidation } from '../../validation/programing-language-validation.js';
import { getPagination } from '../../utils/base-func-utils.js';

/**
 * @function createProgrammingLang
 * @description Menambahkan bahasa pemrograman baru
 * @param {Object} request - Data bahasa pemrograman
 * @returns {Promise<Object>}
 */


const createProgrammingLang = async (request) => {
  validate(programmingLanguageValidation, {
    name: request.name,
    experience: request.experience,
    experienceType: request.experienceType,
  });

  const { name, experience, experienceType, userId } = request;


  const existing = await prismaClient.programmingLanguage.findFirst({
    where: {
      name: name,
      userId: userId,
    },
  });

  if (existing) {
    throw new ApiError(StatusCodes.CONFLICT, `Bahasa pemrograman "${name}" sudah terdaftar.`);
  }

  return prismaClient.programmingLanguage.create({
    data: {
      name,
      experience,
      experienceType,
      userId,
    },
  });
};


/**
 * @function updateProgrammingLang
 * @description Mengupdate data bahasa pemrograman berdasarkan ID
 * @param {string} id
 * @param {Object} request
 * @returns {Promise<Object>}
 */
const updateProgrammingLang = async (id, request) => {
  const existing = await prismaClient.programmingLanguage.findUnique({ where: { id } });
  if (!existing) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Bahasa pemrograman tidak ditemukan');
  }

  validate(programmingLanguageValidation, {
    name: request.name,
    experience: request.experience,
    experienceType: request.experienceType,
  });

  const updated = await prismaClient.programmingLanguage.update({
    where: { id },
    data: {
      name: request.name,
      experience: request.experience,
      experienceType: request.experienceType,
    },
  });

  // Format responsenya agar konsisten dengan frontend (harus ada id, bukan hanya _id)
  return {
    id: updated.id,
    name: updated.name,
    experience: updated.experience,
    experienceType: updated.experienceType,
    createdAt: updated.createdAt,
  };
};



/**
 * @function getAllProgrammingLangs
 * @description Mengambil semua bahasa pemrograman dengan pagination dan filter optional by user
 * @param {number} page
 * @param {number} limit
 * @param {string} [userId]
 * @returns {Promise<Object>}
 */
const getAllProgrammingLangs = async (page = 1, limit = 5, userId) => {
  const { skip, limit: take, metadata } = getPagination({ page, limit });
  const whereClause = userId ? { userId } : {};

  const [data, total] = await Promise.all([
    prismaClient.programmingLanguage.findMany({
      where: whereClause,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    }),
    prismaClient.programmingLanguage.count({ where: whereClause }),
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
 * @function getProgrammingLangsByUserId
 * @description Mengambil semua bahasa pemrograman berdasarkan userId
 * @param {string} userId
 * @returns {Promise<Array>}
 */
const getProgrammingLangsByUserId = async (userId) => {
  if (!userId) throw new ApiError(StatusCodes.BAD_REQUEST, 'User ID harus disertakan');

  return prismaClient.programmingLanguage.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

/**
 * @function deleteProgrammingLang
 * @description Menghapus bahasa pemrograman berdasarkan ID
 * @param {string} id
 */
const deleteProgrammingLang = async (id) => {
  const existing = await prismaClient.programmingLanguage.findUnique({ where: { id } });
  if (!existing) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Bahasa pemrograman tidak ditemukan');
  }

  await prismaClient.programmingLanguage.delete({ where: { id } });
};

export default {
  createProgrammingLang,
  updateProgrammingLang,
  getAllProgrammingLangs,
  getProgrammingLangsByUserId,
  deleteProgrammingLang,
};
