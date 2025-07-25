import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catch-async-utils.js';
import spokenLanguageService from '../../service/spokenLanguage/spoken-language-service.js';

/**
 * @controller createSpokenLanguage
 * @description Menambah data bahasa baru untuk pengguna yang sedang login.
 * @route POST /api/spoken-languages
 * @access Private
 */
const createSpokenLanguage = catchAsync(async (req, res) => {
  const data = await spokenLanguageService.createSpokenLanguage({
    ...req.body,
    userId: req.user.id, // User ID diambil dari middleware autentikasi
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: 'Bahasa yang dikuasai berhasil ditambahkan.',
    data,
  });
});

/**
 * @controller updateSpokenLanguage
 * @description Memperbarui data bahasa berdasarkan ID.
 * @route PATCH /api/spoken-languages/:id
 * @access Private
 */
const updateSpokenLanguage = catchAsync(async (req, res) => {
  const data = await spokenLanguageService.updateSpokenLanguage(req.params.id, req.body);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Bahasa yang dikuasai berhasil diperbarui.',
    data,
  });
});

/**
 * @controller deleteSpokenLanguage
 * @description Menghapus data bahasa berdasarkan ID.
 * @route DELETE /api/spoken-languages/:id
 * @access Private
 */
const deleteSpokenLanguage = catchAsync(async (req, res) => {
  await spokenLanguageService.deleteSpokenLanguage(req.params.id);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Bahasa yang dikuasai berhasil dihapus.',
  });
});

/**
 * @controller getAllSpokenLanguages
 * @description Mengambil daftar bahasa pengguna yang login (dengan pagination).
 * @route GET /api/spoken-languages
 * @access Private
 */
const getAllSpokenLanguages = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5; // Default limit 10
  const userId = req.user.id; // Mengambil ID dari pengguna yang login

  // Memanggil service dengan parameter yang benar (page, limit, userId)
  // dan mengambil data beserta metadata pagination
  const { data, metadata } = await spokenLanguageService.getAllSpokenLanguages(page, limit, userId);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Daftar bahasa yang dikuasai berhasil diambil.',
    data,
    metadata, // Sertakan metadata dalam respons
  });
});

/**
 * @controller getSpokenLanguagesByUserId
 * @description Mengambil semua data bahasa berdasarkan ID pengguna (tanpa pagination).
 * @route GET /api/users/:userId/spoken-languages
 * @access Public
 */
const getSpokenLanguagesByUserId = catchAsync(async (req, res) => {
    // Mengambil userId dari parameter URL untuk halaman profil publik
    const  userId  = req.user.id;

    const data = await spokenLanguageService.getSpokenLanguagesByUserId(userId);

    res.status(StatusCodes.OK).json({
        success: true,
        msg: `Daftar bahasa untuk pengguna ${userId} berhasil diambil.`,
        data,
    });
});


// Mengekspor semua fungsi controller
export default {
  createSpokenLanguage,
  updateSpokenLanguage,
  deleteSpokenLanguage,
  getAllSpokenLanguages,
  getSpokenLanguagesByUserId, // Menambahkan fungsi baru
};