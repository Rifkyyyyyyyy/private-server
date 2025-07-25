import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catch-async-utils.js';
import programmingLangService from '../../service/progaming/progaming-language-service.js';

/**
 * @controller createProgrammingLang
 * @description Menambah data bahasa pemrograman baru untuk pengguna yang login.
 * @route POST /api/programming-languages
 * @access Private
 */
const createProgrammingLang = catchAsync(async (req, res) => {
  const data = await programmingLangService.createProgrammingLang({
    ...req.body,
    userId: req.user.id,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: 'Bahasa pemrograman berhasil ditambahkan.',
    data,
  });
});

/**
 * @controller updateProgrammingLang
 * @description Memperbarui data bahasa pemrograman berdasarkan ID.
 * @route PATCH /api/programming-languages/:id
 * @access Private
 */
const updateProgrammingLang = catchAsync(async (req, res) => {
  const progamming = await programmingLangService.updateProgrammingLang(req.params.id, req.body);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Bahasa pemrograman berhasil diperbarui.',
    data: progamming
  });
});

/**
 * @controller deleteProgrammingLang
 * @description Menghapus data bahasa pemrograman berdasarkan ID.
 * @route DELETE /api/programming-languages/:id
 * @access Private
 */
const deleteProgrammingLang = catchAsync(async (req, res) => {
  await programmingLangService.deleteProgrammingLang(req.params.id);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Bahasa pemrograman berhasil dihapus.',
  });
});

/**
 * @controller getAllProgrammingLangs
 * @description Mengambil daftar bahasa pemrograman milik pengguna yang login (dengan pagination).
 * @route GET /api/programming-languages
 * @access Private
 */
const getAllProgrammingLangs = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const userId = req.user.id; // ✅ Ambil userId dari pengguna yang login

  // ✅ Memanggil service dengan parameter userId dan mengambil data + metadata
  const { data, metadata } = await programmingLangService.getAllProgrammingLangs(page, limit, userId);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Daftar bahasa pemrograman berhasil diambil.',
    data,
    metadata, // ✅ Sertakan metadata untuk pagination
  });
});

/**
 * @controller getProgrammingLangsByUserId
 * @description Mengambil semua bahasa pemrograman milik user tertentu (tanpa pagination).
 * @route GET /api/users/:userId/programming-languages
 * @access Public
 */
const getProgrammingLangsByUserId = catchAsync(async (req, res) => {
  // Mengambil userId dari parameter URL (untuk halaman profil publik)
  const userId = req.user.id;

  const data = await programmingLangService.getProgrammingLangsByUserId(userId);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: `Daftar bahasa pemrograman untuk pengguna ${userId} berhasil diambil.`,
    data,
  });
});

// Mengekspor semua fungsi yang relevan
export default {
  createProgrammingLang,
  updateProgrammingLang,
  deleteProgrammingLang,
  getAllProgrammingLangs,
  getProgrammingLangsByUserId, // ✅ Menambahkan fungsi baru
};