import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catch-async-utils.js';
import blogServices from '../../service/blog/blog-services.js';
import { ApiError } from '../../utils/apiError-utils.js';

const createBlog = catchAsync(async (req, res) => {
  const { title, summary } = req.body;
  const coverFile = req.files?.coverFile;
  const userId = req.user.id;

  // Parse detail (karena dikirim sebagai string JSON)
  let detail;
  try {
    detail = JSON.parse(req.body.detail);
  } catch (err) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Format detail tidak valid (harus JSON)');
  }

  const blog = await blogServices.createBlog({
    userId,
    title,
    summary,
    detail,
    coverFile,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: 'Blog berhasil dibuat',
    data: blog,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const blogId = req.params.id;
  const { title, summary } = req.body;
  const coverFile = req.files?.coverFile;

  // Parse detail
  let detail;
  try {
    detail = JSON.parse(req.body.detail);
  } catch (err) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Format detail tidak valid (harus JSON)');
  }

  const updatedBlog = await blogServices.updateBlog(blogId, {
    title,
    summary,
    detail,
    coverFile,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Blog berhasil diperbarui',
    data: updatedBlog,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const blogs = await blogServices.getAllBlogs(page, limit);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Berhasil mengambil daftar blog',
    ...blogs,
  });
});

const getBlogBySlug = catchAsync(async (req, res) => {
  const slug = req.params.slug;

  const blog = await blogServices.getBlogBySlug(slug);

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Berhasil mengambil data blog',
    data: blog,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const blogId = req.params.id;

  await blogServices.deleteBlog(blogId);

  res.status(StatusCodes.NO_CONTENT).json({
    success: true,
    msg: 'Blog berhasil dihapus',
    data: null,
  });
});

export default {
  createBlog,
  updateBlog,
  getAllBlogs,
  getBlogBySlug,
  deleteBlog,
};
