import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catch-async-utils.js';
import educationsService from '../../service/educations/educations-service.js';

/**
 * @controller createEducation
 * @description Menambah data pendidikan baru untuk pengguna yang login.
 * @route POST /api/educations
 * @access Private
 */
const createEducation = catchAsync(async (req, res) => {
  const userId = req.user.id;
  console.log(`id : ${userId}`);
  const education = await educationsService.createEducation(userId, req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: 'Data pendidikan berhasil ditambahkan.',
    data: education,
  });
});

/**
 * @controller updateEducation
 * @description Memperbarui data pendidikan berdasarkan ID.
 * @route PATCH /api/educations/:id
 * @access Private
 */
const updateEducation = catchAsync(async (req, res) => {
  // Service akan memvalidasi kepemilikan sebelum update
  const education = await educationsService.updateEducation(req.params.id, req.body);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Data pendidikan berhasil diperbarui.',
    data: education,
  });
});

/**
 * @controller deleteEducation
 * @description Menghapus data pendidikan berdasarkan ID.
 * @route DELETE /api/educations/:id
 * @access Private
 */
const deleteEducation = catchAsync(async (req, res) => {
  await educationsService.deleteEducation(req.params.id);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Data pendidikan berhasil dihapus.',
  });
});

/**
 * @controller getAllEducations
 * @description Mengambil daftar pendidikan milik pengguna yang login (dengan pagination).
 * @route GET /api/educations
 * @access Private
 */
const getAllEducations = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const userId = req.user.id; // ✅ Ambil ID dari pengguna yang login

  // ✅ Panggil service dengan menyertakan userId untuk filtering
  const { data, metadata } = await educationsService.getAllEducations({ page, limit, userId });

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Daftar pendidikan berhasil diambil.',
    data,
    metadata,
  });
});

/**
 * @controller getEducationByUserId
 * @description Mengambil semua data pendidikan milik user tertentu (tanpa pagination).
 * @route GET /api/users/:userId/educations
 * @access Public
 */
const getEducationByUserId = catchAsync(async (req, res) => {
  const userId = req.user.id; // Ambil userId dari parameter URL
  const data = await educationsService.getEducationByUserId(userId);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: `Daftar pendidikan untuk pengguna ${userId} berhasil diambil.`,
    data,
  });
});


// Mengekspor semua fungsi controller
export default {
  createEducation,
  updateEducation,
  deleteEducation,
  getAllEducations,
  getEducationByUserId, // ✅ Menambahkan fungsi baru
};