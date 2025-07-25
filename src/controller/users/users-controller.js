import { generateAccessToken } from "../../utils/generate-token-utils.js";
import { catchAsync } from "../../utils/catch-async-utils.js";
import { StatusCodes } from "http-status-codes";
import usersService from "../../service/users/users-service.js";

/**
 * Controller untuk registrasi user baru
 */
const registerUser = catchAsync(async (req, res) => {
  const user = await usersService.register(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Registrasi berhasil",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

/**
 * Controller untuk login user dengan email dan password
 * Menghasilkan access token dan set cookie httpOnly
 */
const loginUser = catchAsync(async (req, res) => {
  const user = await usersService.loginWithEmailPassword(req.body);

  const token = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
    maxAge: 3600000, // 1 jam
  });

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Login berhasil",
    data: user,
  });
});

/**
 * Controller untuk update profil user
 * File avatar diambil dari multer di req.file
 * UserId diasumsikan sudah disisipkan oleh middleware autentikasi
 */
const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const avatar = req.files.avatar; // multer file upload
  const requestData = {
    ...req.body,
    avatar, // sertakan file avatar jika ada
  };

  const updatedUser = await usersService.updateUser(id, requestData);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Profil berhasil diperbarui",
    data: updatedUser,
  });
});

/**
 * Controller untuk mengambil data user yang sedang login (current user)
 * Data user diasumsikan sudah disisipkan di req.user oleh middleware autentikasi
 */
const getCurrentUser = catchAsync((req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: "User ditemukan",
    user: req.user,
  });
});

/**
 * Controller untuk logout user
 * Menghapus cookie token
 */
const logoutUser = catchAsync((req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Logout berhasil",
  });
});

/**
 * Controller untuk menghapus akun user yang sedang login
 */
const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req;

  await usersService.deleteUser(userId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Akun berhasil dihapus",
  });
});



export default {
  registerUser,
  loginUser,
  updateUser,
  getCurrentUser,
  logoutUser,
  deleteUser,
};
