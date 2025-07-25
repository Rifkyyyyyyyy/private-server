import cloudinary from '../../cloudinary.js';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../../utils/apiError-utils.js';
import streamifier from 'streamifier';

/**
 * Upload file ke Cloudinary menggunakan stream
 * @param {string} folderName - nama folder di Cloudinary
 * @param {object} file - object file dari req.files
 * @param {string} fileName - nama file (tanpa ekstensi)
 * @param {string} resource_type - tipe resource Cloudinary, default 'raw' untuk dokumen
 * @returns {Promise<{ fileUrl: string, fileUrlAttachment: string, publicId: string, version: number }>}
 */
const uploadToCloudinary = (folderName, file, fileName, resource_type = 'raw') => {
  return new Promise((resolve, reject) => {
    try {
      if (!folderName || !file || !file.data || !fileName) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Parameter upload tidak lengkap');
      }

      const uploadStream = cloudinary.uploader.upload_stream({
        public_id: fileName,
        folder: folderName,
        resource_type,
        overwrite: true,
      }, (error, result) => {
        if (error) {
          return reject(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Gagal upload file ke Cloudinary: ${error.message}`));
        }

        const fileUrl = result.secure_url;
        const fileUrlAttachment = generateAttachmentUrl(result.public_id, resource_type, result.version);

        resolve({
          fileUrl,
          fileUrlAttachment,
          publicId: result.public_id,
          version: result.version,
        });
      });

      streamifier.createReadStream(file.data).pipe(uploadStream);
    } catch (err) {
      reject(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Gagal upload file ke Cloudinary: ${err.message}`));
    }
  });
};

/**
 * Hapus file dari Cloudinary berdasarkan publicId
 * @param {string} publicId 
 * @param {string} resource_type 
 */
const deleteFromCloudinary = async (publicId, resource_type = 'raw') => {
  try {
    if (!publicId) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'publicId tidak boleh kosong');
    }

    const result = await cloudinary.uploader.destroy(publicId, { resource_type });

    if (result.result !== 'ok' && result.result !== 'not found') {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Gagal menghapus file dari Cloudinary: ${result.result}`);
    }
  } catch (err) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Gagal menghapus file dari Cloudinary: ${err.message}`);
  }
};

/**
 * Generate URL Cloudinary dengan flag fl_attachment supaya file langsung didownload saat dibuka
 * @param {string} publicId 
 * @param {string} resource_type 
 * @param {number|string} version 
 * @returns {string} URL Cloudinary dengan fl_attachment dan versi yang benar
 */
const generateAttachmentUrl = (publicId, resource_type = 'raw', version) => {
  const options = {
    resource_type,
    transformation: [{ flags: 'attachment' }],
  };
  if (version) options.version = version;

  return cloudinary.url(publicId, options);
};

export default {
  uploadToCloudinary,
  deleteFromCloudinary,
  generateAttachmentUrl,
};
