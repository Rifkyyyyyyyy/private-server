import bcrypt from 'bcrypt';
import { prismaClient } from '../../application/database.js';
import { validate } from '../../validation/validation.js';
import { ApiError } from '../../utils/apiError-utils.js';
import { StatusCodes } from 'http-status-codes';
import {
  registerValidation,
  loginValidation,
  updateUserValidation,
} from '../../validation/auth-validation.js';
import cloudinaryServices from '../cloudinary/cloudinary-services.js';
import { generateApiKey } from '../../utils/base-func-utils.js';
import { nanoid } from 'nanoid';

/**
 * Ambil data user berdasarkan ID tanpa mengembalikan password
 * @param {string} id - ID user
 * @returns {Promise<Object>} Data user tanpa password
 */
const getUserById = async (id) => {
  const user = await prismaClient.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      apiKey: true,
      about: true,
      profilePhoto: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User tidak ditemukan');
  return user;
};

/**
 * Update data user, termasuk upload foto profil jika ada
 * @param {string} id - ID user
 * @param {Object} request - Data yang akan diupdate
 * @param {File} [request.avatar] - File foto avatar baru (optional)
 * @param {string} request.name - Nama user
 * @param {string} request.about - Deskripsi about user
 * @returns {Promise<Object>} Data user yang sudah diupdate tanpa password
 */

const updateUser = async (id, request) => {
  const user = await prismaClient.user.findUnique({ where: { id } });
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User tidak ditemukan');

  let profilePhoto = user.profilePhoto;
  let photo = null;

  if (request.avatar) {
    if (profilePhoto?.publicId) {
      await cloudinaryServices.deleteFromCloudinary(profilePhoto.publicId);
    }

    const uploaded = await cloudinaryServices.uploadToCloudinary(
      'avatars',
      request.avatar,
      `avatar-${id}`,
      'image'
    );

    photo = {
      url: uploaded.fileUrl,
      publicId: uploaded.publicId,
    };
  }

  // Pastikan about berupa string
  if (request.about === undefined || request.about === null) {
    request.about = '';
  }

  // Kalau profilePhoto null, hapus supaya gak divalidasi
  if (request.profilePhoto === null) {
    delete request.profilePhoto;
  }

  // Tentukan objek profilePhoto yang valid untuk validasi
  let profilePhotoForValidation;
  if (photo && Object.keys(photo).length > 0) {
    profilePhotoForValidation = photo;
  } else if (
    request.profilePhoto &&
    typeof request.profilePhoto === 'object' &&
    request.profilePhoto.url &&
    request.profilePhoto.publicId
  ) {
    profilePhotoForValidation = request.profilePhoto;
  } else {
    profilePhotoForValidation = undefined;
  }

  // Validasi lengkap
  validate(updateUserValidation, {
    email: request.email ?? user.email,
    password: request.password,
    name: request.name ?? user.name,
    about: request.about ?? user.about,
    profilePhoto: profilePhotoForValidation,
  });

  const dataToUpdate = {
    name: request.name ?? user.name,
    about: request.about ?? user.about,
    profilePhoto: profilePhotoForValidation ?? profilePhoto,
  };

  if (request.password) {
    dataToUpdate.password = await bcrypt.hash(request.password, 10);
  }

  const updatedUser = await prismaClient.user.update({
    where: { id },
    data: dataToUpdate,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      apiKey: true,
      about: true,
      profilePhoto: true,
      createdAt: true,
    },
  });

  return updatedUser;
};




/**
 * Registrasi user baru dengan validasi dan hashing password,
 * ID user dibuat dengan format "user-<unik>"
 * @param {Object} request
 * @param {string} request.name
 * @param {string} request.email
 * @param {string} request.password
 * @returns {Promise<Object>} Data user baru tanpa password
 */
const register = async (request) => {
  validate(registerValidation, {
    name: request.name,
    email: request.email,
    password: request.password,
  });

  const { name, email, password } = request;

  const existingUser = await prismaClient.user.findUnique({ where: { email } });
  if (existingUser) throw new ApiError(StatusCodes.BAD_REQUEST, 'Email sudah terdaftar');

  const hashedPassword = await bcrypt.hash(password, 10);

  const id = `user-${nanoid(10)}`;

  const newUser = await prismaClient.user.create({
    data: {
      id,
      name,
      email,
      password: hashedPassword,
      apiKey: generateApiKey(),
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      apiKey: true,
      about: true,
      profilePhoto: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return newUser;
};

/**
 * Login user dengan email dan password
 * @param {Object} request
 * @param {string} request.email
 * @param {string} request.password
 * @returns {Promise<Object>} Data user jika berhasil login tanpa password
 */
const loginWithEmailPassword = async (request) => {
  validate(loginValidation, {
    email: request.email,
    password: request.password,
  });

  const { email, password } = request;

  const user = await prismaClient.user.findUnique({ where: { email } });
  if (!user) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Email tidak ditemukan');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Password salah');

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    apiKey: user.apiKey,
    profilePhoto: user.profilePhoto || null,
    about: user.about || null,
  };
};

/**
 * Hapus user dan foto profil dari Cloudinary jika ada
 * @param {string} userId
 * @returns {Promise<Object>} Data user yang dihapus tanpa password
 */
const deleteUser = async (userId) => {
  const user = await prismaClient.user.findUnique({ where: { id: userId } });
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User tidak ditemukan');

  if (user.profilePhoto?.publicId) {
    await cloudinaryServices.deleteFromCloudinary(user.profilePhoto.publicId);
  }

  const deletedUser = await prismaClient.user.delete({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      apiKey: true,
      about: true,
      profilePhoto: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return deletedUser;
};

export default {
  register,
  loginWithEmailPassword,
  updateUser,
  deleteUser,
  getUserById,
};
