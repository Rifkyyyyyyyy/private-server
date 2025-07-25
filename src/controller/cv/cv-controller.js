import { StatusCodes } from 'http-status-codes';
import cvServices from '../../service/cv/cv-services.js';
import { catchAsync } from '../../utils/catch-async-utils.js';
import { ApiError } from '../../utils/apiError-utils.js';

/**
 * @function createCV
 * @description Membuat CV baru dan upload file ke Cloudinary
 */
const createCV = catchAsync(async (req, res) => {
  const { title, description, category } = req.body;
  const file = req.files?.file;
  const userId = req.user.id;

  if (!file) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'File CV wajib diunggah');
  }

  const result = await cvServices.createCV({
    userId,
    title,
    description,
    file,
    category,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'CV berhasil diunggah',
    data: result,
  });
});

/**
 * @function getAllCv
 * @description Mengambil semua CV (dengan pagination & filter opsional)
 */
const getAllCv = catchAsync(async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const userId = req.user.id;

  const result = await cvServices.getAllCv(
    parseInt(page),
    parseInt(limit),
    userId
  );

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Daftar CV berhasil diambil',
    ...result,
  });
});

/**
 * @function getCV
 * @description Mengambil satu CV berdasarkan userId & kategori
 */
const getCV = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { category } = req.query;

  const result = await cvServices.getCV(userId, category);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'CV berhasil diambil',
    data: result,
  });
});

/**
 * @function updateCV
 * @description Mengupdate CV berdasarkan ID
 */
const updateCV = catchAsync(async (req, res) => {
  const { title, description, category } = req.body;
  const file = req.files?.file;
  const userId = req.user?.id;
  const { id } = req.params;

  const result = await cvServices.updateCV(id, {
    userId,
    title,
    description,
    category,
    file,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'CV berhasil diperbarui',
    data: result,
  });
});

/**
 * @function deleteCV
 * @description Menghapus CV berdasarkan ID
 */
const deleteCV = catchAsync(async (req, res) => {
  const { id } = req.params;

  await cvServices.deleteCV(id);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'CV berhasil dihapus',
  });
});

export default {
  createCV,
  getAllCv,
  getCV,
  updateCV,
  deleteCV,
};
