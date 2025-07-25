import { prismaClient } from '../../application/database.js';
import { ApiError } from '../../utils/apiError-utils.js';
import { StatusCodes } from 'http-status-codes';
import { validate } from '../../validation/validation.js';
import { techStackValidation } from '../../validation/tech-stack-validation.js';
import { getPagination } from '../../utils/base-func-utils.js';

/**
 * @function createTechStack
 * @description Membuat data tech stack baru
 * @param {Object} request
 */
const createTechStack = async (request) => {

  validate(techStackValidation, {
    name: request.name,
    category: request.category,
  });

  const { name, category, userId } = request;

  if (!userId) throw new ApiError(StatusCodes.BAD_REQUEST, 'User ID harus disertakan');

  const result = await prismaClient.techStack.create({
    data: { name, category, userId },
  });

  return result;
};

/**
 * @function updateTechStack
 * @description Update tech stack berdasarkan ID
 * @param {string} id 
 * @param {Object} request 
 */
const updateTechStack = async (id, request) => {

  
  const existing = await prismaClient.techStack.findUnique({ where: { id } });
  if (!existing) throw new ApiError(StatusCodes.NOT_FOUND, 'Tech Stack tidak ditemukan');

  validate(techStackValidation, {
    name: request.name,
    category: request.category,
  });

  const { name, category } = request;

  return await prismaClient.techStack.update({
    where: { id },
    data: { name, category },
  });
};

/**
 * @function getAllTechStacks
 * @description Ambil tech stacks user dengan pagination
 * @param {number} page 
 * @param {number} limit 
 * @param {string} userId 
 */
const getAllTechStacks = async (page, limit, userId) => {
  if (!userId) throw new ApiError(StatusCodes.BAD_REQUEST, 'User ID harus disertakan');

  const { skip, limit: take, metadata } = getPagination({ page, limit });

  const [data, total] = await Promise.all([
    prismaClient.techStack.findMany({
      where: { userId },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    }),
    prismaClient.techStack.count({ where: { userId } }),
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
 * @function deleteTechStack
 * @description Hapus tech stack berdasarkan ID
 * @param {string} id 
 */
const deleteTechStack = async (id) => {
  const existing = await prismaClient.techStack.findUnique({ where: { id } });
  if (!existing) throw new ApiError(StatusCodes.NOT_FOUND, 'Tech Stack tidak ditemukan');

  await prismaClient.techStack.delete({ where: { id } });
};

/**
 * @function getTechStackByUserId
 * @description Ambil semua tech stack user tanpa pagination
 * @param {string} userId 
 */
const getTechStackByUserId = async (userId) => {
  if (!userId) throw new ApiError(StatusCodes.BAD_REQUEST, 'User ID harus disertakan');

  const user = await prismaClient.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User tidak ditemukan dengan ID tersebut');

  const techStacks = await prismaClient.techStack.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  return techStacks;
};

export default {
  createTechStack,
  updateTechStack,
  getAllTechStacks,
  deleteTechStack,
  getTechStackByUserId,
};
