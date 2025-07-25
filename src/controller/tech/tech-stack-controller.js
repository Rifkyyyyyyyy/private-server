import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catch-async-utils.js';
import techStackService from '../../service/tech/tech-stack-service.js';

const createTechStack = catchAsync(async (req, res) => {
  const data = await techStackService.createTechStack({
    ...req.body,
    userId: req.user.id,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: 'Tech stack berhasil ditambahkan.',
    data,
  });
});

const updateTechStack = catchAsync(async (req, res) => {

  const data = await techStackService.updateTechStack(req.params.id, req.body);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Tech stack berhasil diperbarui.',
    data,
  });
});

const deleteTechStack = catchAsync(async (req, res) => {
  await techStackService.deleteTechStack(req.params.id);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Tech stack berhasil dihapus.',
  });
});

const getAllTechStacks = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const userId = req.user.id;

  const { data, metadata } = await techStackService.getAllTechStacks(page, limit, userId);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Daftar tech stack berhasil diambil.',
    data,
    metadata,
  });
});

const getTechStackByUserId = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const data = await techStackService.getTechStackByUserId(userId);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: `Daftar tech stack untuk user ${userId} berhasil diambil.`,
    data,
  });
});

export default {
  createTechStack,
  updateTechStack,
  deleteTechStack,
  getAllTechStacks,
  getTechStackByUserId,
};
