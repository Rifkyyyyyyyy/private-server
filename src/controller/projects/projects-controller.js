import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catch-async-utils.js';
import projectService from '../../service/projects/project-service.js';

const createProject = catchAsync(async (req, res) => {
  let detail = {};
  try {
    detail = req.body.detail ? JSON.parse(req.body.detail) : {};
  } catch {
    detail = {};
  }

  let tags = [];
  if (typeof req.body.tags === 'string') {
    try {
      tags = JSON.parse(req.body.tags);
      if (!Array.isArray(tags)) tags = [];
    } catch {
      tags = req.body.tags.split(',').map(t => t.trim()).filter(Boolean);
    }
  } else if (Array.isArray(req.body.tags)) {
    tags = req.body.tags;
  }

  const request = {
    userId: req.user.id,
    title: req.body.title,
    description: req.body.description,
    tags,
    detail,
    fileBanners: req.files?.fileBanners || [],
  };

  const project = await projectService.createProject(request);

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: 'Project berhasil dibuat.',
    data: project,
  });
});

const updateProject = catchAsync(async (req, res) => {
  let detail = {};
  try {
    detail = req.body.detail ? JSON.parse(req.body.detail) : {};
  } catch {
    detail = {};
  }

  let tags = [];
  if (typeof req.body.tags === 'string') {
    try {
      tags = JSON.parse(req.body.tags);
      if (!Array.isArray(tags)) tags = [];
    } catch {
      tags = req.body.tags.split(',').map(t => t.trim()).filter(Boolean);
    }
  } else if (Array.isArray(req.body.tags)) {
    tags = req.body.tags;
  }

  const request = {
    title: req.body.title,
    description: req.body.description,
    tags,
    detail,
    fileBanners: req.files?.fileBanners || [],
  };

  const project = await projectService.updateProject(req.params.id, request);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Project berhasil diupdate.',
    data: project,
  });
});


const deleteProject = catchAsync(async (req, res) => {
  await projectService.deleteProject(req.params.id);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Project berhasil dihapus.',
    data: null,
  });
});

const getAllProject = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const userId = req.user?.id;

  const projects = await projectService.getAllProject(page, limit, userId);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Daftar project berhasil diambil.',
    ...projects,
  });
});

const getDetailProjectBySlug = catchAsync(async (req, res) => {
  const slug = req.params.slug;

  const project = await projectService.getDetailProjectBySlug(slug);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Detail project berhasil diambil.',
    data: project,
  });
});

export default {
  createProject,
  updateProject,
  deleteProject,
  getAllProject,
  getDetailProjectBySlug,
};
