import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catch-async-utils.js';
import certificateServices from '../../service/certificate/certificate-services.js';

/**
 * @function createCertificate
 * @description Menambahkan sertifikat baru beserta file PDF & gambar preview
 */
const createCertificate = catchAsync(async (req, res) => {
  const data = await certificateServices.createCertificate({
    ...req.body,
    file: req.files?.file,          // file PDF (raw)
    viewFile: req.files?.viewFile,  // gambar preview (image)
    userId: req.user?.id,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: 'Sertifikat berhasil ditambahkan',
    data,
  });
});

/**
 * @function updateCertificate
 * @description Memperbarui sertifikat berdasarkan ID
 */
const updateCertificate = catchAsync(async (req, res) => {
  const data = await certificateServices.updateCertificate(req.params.id, {
    ...req.body,
    file: req.files?.file,
    viewFile: req.files?.viewFile,
    userId: req.user?.id,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Sertifikat berhasil diperbarui',
    data,
  });
});

/**
 * @function deleteCertificate
 * @description Menghapus sertifikat berdasarkan ID
 */
const deleteCertificate = catchAsync(async (req, res) => {
  await certificateServices.deleteCertificate(req.params.id);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Sertifikat berhasil dihapus',
  });
});

/**
 * @function getAllCertificates
 * @description Mengambil semua sertifikat dengan pagination dan optional userId
 */
const getAllCertificates = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { page = 1, limit = 5 } = req.query;

  const data = await certificateServices.getAllCertificate(
    parseInt(page, 10),
    parseInt(limit, 10),
    userId
  );

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Daftar sertifikat berhasil diambil',
    ...data,
  });
});

export default {
  createCertificate,
  updateCertificate,
  deleteCertificate,
  getAllCertificates,
};
