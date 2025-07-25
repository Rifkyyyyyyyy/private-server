import express from "express";
import rateLimit from "express-rate-limit";
import { protect } from "../middleware/auth-middleware.js";
import { apiKeyMiddleware } from "../middleware/api-key-middleware.js";
import usersController from "../controller/users/users-controller.js";
import projectsController from "../controller/projects/projects-controller.js";
import educationsController from "../controller/educations/educations-controller.js";
import programingLanguageController from "../controller/programingLanguage/programing-language-controller.js";
import techStackController from "../controller/tech/tech-stack-controller.js";
import spokenController from "../controller/spoken/spoken-controller.js";
import certificateController from "../controller/certificate/certificate-controller.js";
import cvController from "../controller/cv/cv-controller.js";
import blogController from "../controller/blog/blog-controller.js";

const privateRoutes = express.Router();

const privateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    msg: 'Terlalu banyak permintaan. Coba lagi nanti.',
  },
});

privateRoutes.use(privateLimiter);

// ROUTES yang pakai protect + rateLimit
privateRoutes.put('/api/auth/:id', protect, usersController.updateUser);
privateRoutes.get('/api/users/me', protect, usersController.getCurrentUser);
privateRoutes.post('/api/users/logout', protect, usersController.logoutUser);
privateRoutes.delete('/api/users/delete/:id', protect, usersController.deleteUser);

// PROJECTS
privateRoutes.get('/api/projects', protect, projectsController.getAllProject);
privateRoutes.post('/api/projects', protect, projectsController.createProject);
privateRoutes.put('/api/projects/:id', protect, projectsController.updateProject);
privateRoutes.delete('/api/projects/:id', protect, projectsController.deleteProject);

// BlOG
privateRoutes.get('/api/blogs', protect, blogController.getAllBlogs);
privateRoutes.post('/api/blogs', protect, blogController.createBlog);
privateRoutes.put('/api/blogs/:id', protect, blogController.updateBlog);
privateRoutes.delete('/api/blogs/:id', protect, blogController.deleteBlog);

// EDUCATIONS
privateRoutes.get('/api/educations', protect, educationsController.getAllEducations);
privateRoutes.post('/api/educations', protect, educationsController.createEducation);
privateRoutes.put('/api/educations/:id', protect, educationsController.updateEducation);
privateRoutes.delete('/api/educations/:id', protect, educationsController.deleteEducation);

// PROGRAMMING LANGUAGES
privateRoutes.get('/api/programming-languages', protect, programingLanguageController.getAllProgrammingLangs);
privateRoutes.post('/api/programming-languages', protect, programingLanguageController.createProgrammingLang);
privateRoutes.put('/api/programming-languages/:id', protect, programingLanguageController.updateProgrammingLang);
privateRoutes.delete('/api/programming-languages/:id', protect, programingLanguageController.deleteProgrammingLang);

// TECH STACKS
privateRoutes.get('/api/tech-stacks', protect, techStackController.getAllTechStacks);
privateRoutes.post('/api/tech-stacks', protect, techStackController.createTechStack);
privateRoutes.put('/api/tech-stacks/:id', protect, techStackController.updateTechStack);
privateRoutes.delete('/api/tech-stacks/:id', protect, techStackController.deleteTechStack);

// SPOKEN LANGUAGES
privateRoutes.get('/api/spoken-languages', protect, spokenController.getAllSpokenLanguages);
privateRoutes.post('/api/spoken-languages', protect, spokenController.createSpokenLanguage);
privateRoutes.put('/api/spoken-languages/:id', protect, spokenController.updateSpokenLanguage);
privateRoutes.delete('/api/spoken-languages/:id', protect, spokenController.deleteSpokenLanguage);

// CERTIFICATES
privateRoutes.get('/api/certificates', protect, certificateController.getAllCertificates);
privateRoutes.post('/api/certificates', protect, certificateController.createCertificate);
privateRoutes.put('/api/certificates/:id', protect, certificateController.updateCertificate);
privateRoutes.delete('/api/certificates/:id', protect, certificateController.deleteCertificate);

// CV
privateRoutes.get('/api/cv', protect, cvController.getAllCv);
privateRoutes.post('/api/cv', protect, cvController.createCV);
privateRoutes.put('/api/cv/:id', protect, cvController.updateCV);
privateRoutes.delete('/api/cv/:id', protect, cvController.deleteCV);

// ROUTES yang pakai apiKeyMiddleware (tanpa protect & limiter, atau bisa ditambah limiter kalau perlu)
privateRoutes.get('/api/private/tech', apiKeyMiddleware, techStackController.getTechStackByUserId);
privateRoutes.get('/api/private/spoken', apiKeyMiddleware, spokenController.getSpokenLanguagesByUserId);
privateRoutes.get('/api/private/programming-languages', apiKeyMiddleware, programingLanguageController.getProgrammingLangsByUserId);
privateRoutes.get('/api/private/educations', apiKeyMiddleware, educationsController.getEducationByUserId);
privateRoutes.get('/api/private/cv', apiKeyMiddleware, cvController.getCV);
privateRoutes.get('/api/private/certificates', apiKeyMiddleware, certificateController.getAllCertificates);
privateRoutes.get('/api/private/projects', apiKeyMiddleware, projectsController.getAllProject);
privateRoutes.get('/api/private/projects/:slug', apiKeyMiddleware, projectsController.getDetailProjectBySlug);

export default privateRoutes;
