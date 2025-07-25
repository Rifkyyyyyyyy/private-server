import { StatusCodes } from "http-status-codes";
import cloudinaryServices from "../../service/cloudinary/cloudinary-services.js";
import { catchAsync } from "../../utils/catch-async-utils.js";

/**
 * Upload file ke Cloudinary
 * Body:
 * - folderName: string (wajib)
 * - fileName: string (wajib)
 * - file: file dari multipart/form-data
 */
const uploadFile = catchAsync(async (req, res) => {
  const { folderName, fileName } = req.body;
  const file = req.files?.file;

  if (!file) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: '❌ File tidak ditemukan dalam request',
    });
  }

  if (!folderName || !fileName) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: '❌ folderName dan fileName wajib diisi',
    });
  }

  const result = await cloudinaryServices.uploadToCloudinary(folderName, file, fileName);

  return res.status(StatusCodes.CREATED).json({
    success: true,
    msg: '✅ File berhasil diupload ke Cloudinary',
    data: result, // { fileUrl, publicId }
  });
});

/**
 * Hapus file dari Cloudinary
 * Body:
 * - publicId: string (wajib)
 */
const deleteFile = catchAsync(async (req, res) => {
  const { publicId } = req.body;

  if (!publicId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: '❌ publicId tidak boleh kosong',
    });
  }

  const result = await cloudinaryServices.deleteFromCloudinary(publicId);

  return res.status(StatusCodes.OK).json({
    success: true,
    msg: '✅ File berhasil dihapus dari Cloudinary',
    data: result, // { result: 'ok' }
  });
});

export default {
  uploadFile,
  deleteFile,
};
