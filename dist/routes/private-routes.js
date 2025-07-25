"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
var _authMiddleware = require("../middleware/auth-middleware.js");
var _apiKeyMiddleware = require("../middleware/api-key-middleware.js");
var _usersController = _interopRequireDefault(require("../controller/users/users-controller.js"));
var _projectsController = _interopRequireDefault(require("../controller/projects/projects-controller.js"));
var _educationsController = _interopRequireDefault(require("../controller/educations/educations-controller.js"));
var _programingLanguageController = _interopRequireDefault(require("../controller/programingLanguage/programing-language-controller.js"));
var _techStackController = _interopRequireDefault(require("../controller/tech/tech-stack-controller.js"));
var _spokenController = _interopRequireDefault(require("../controller/spoken/spoken-controller.js"));
var _certificateController = _interopRequireDefault(require("../controller/certificate/certificate-controller.js"));
var _cvController = _interopRequireDefault(require("../controller/cv/cv-controller.js"));
var _blogController = _interopRequireDefault(require("../controller/blog/blog-controller.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var privateRoutes = _express["default"].Router();
var privateLimiter = (0, _expressRateLimit["default"])({
  windowMs: 10 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    msg: 'Terlalu banyak permintaan. Coba lagi nanti.'
  }
});
privateRoutes.use(privateLimiter);

// ROUTES yang pakai protect + rateLimit
privateRoutes.put('/api/auth/:id', _authMiddleware.protect, _usersController["default"].updateUser);
privateRoutes.get('/api/users/me', _authMiddleware.protect, _usersController["default"].getCurrentUser);
privateRoutes.post('/api/users/logout', _authMiddleware.protect, _usersController["default"].logoutUser);
privateRoutes["delete"]('/api/users/delete/:id', _authMiddleware.protect, _usersController["default"].deleteUser);

// PROJECTS
privateRoutes.get('/api/projects', _authMiddleware.protect, _projectsController["default"].getAllProject);
privateRoutes.post('/api/projects', _authMiddleware.protect, _projectsController["default"].createProject);
privateRoutes.put('/api/projects/:id', _authMiddleware.protect, _projectsController["default"].updateProject);
privateRoutes["delete"]('/api/projects/:id', _authMiddleware.protect, _projectsController["default"].deleteProject);

// BlOG
privateRoutes.get('/api/blogs', _authMiddleware.protect, _blogController["default"].getAllBlogs);
privateRoutes.post('/api/blogs', _authMiddleware.protect, _blogController["default"].createBlog);
privateRoutes.put('/api/blogs/:id', _authMiddleware.protect, _blogController["default"].updateBlog);
privateRoutes["delete"]('/api/blogs/:id', _authMiddleware.protect, _blogController["default"].deleteBlog);

// EDUCATIONS
privateRoutes.get('/api/educations', _authMiddleware.protect, _educationsController["default"].getAllEducations);
privateRoutes.post('/api/educations', _authMiddleware.protect, _educationsController["default"].createEducation);
privateRoutes.put('/api/educations/:id', _authMiddleware.protect, _educationsController["default"].updateEducation);
privateRoutes["delete"]('/api/educations/:id', _authMiddleware.protect, _educationsController["default"].deleteEducation);

// PROGRAMMING LANGUAGES
privateRoutes.get('/api/programming-languages', _authMiddleware.protect, _programingLanguageController["default"].getAllProgrammingLangs);
privateRoutes.post('/api/programming-languages', _authMiddleware.protect, _programingLanguageController["default"].createProgrammingLang);
privateRoutes.put('/api/programming-languages/:id', _authMiddleware.protect, _programingLanguageController["default"].updateProgrammingLang);
privateRoutes["delete"]('/api/programming-languages/:id', _authMiddleware.protect, _programingLanguageController["default"].deleteProgrammingLang);

// TECH STACKS
privateRoutes.get('/api/tech-stacks', _authMiddleware.protect, _techStackController["default"].getAllTechStacks);
privateRoutes.post('/api/tech-stacks', _authMiddleware.protect, _techStackController["default"].createTechStack);
privateRoutes.put('/api/tech-stacks/:id', _authMiddleware.protect, _techStackController["default"].updateTechStack);
privateRoutes["delete"]('/api/tech-stacks/:id', _authMiddleware.protect, _techStackController["default"].deleteTechStack);

// SPOKEN LANGUAGES
privateRoutes.get('/api/spoken-languages', _authMiddleware.protect, _spokenController["default"].getAllSpokenLanguages);
privateRoutes.post('/api/spoken-languages', _authMiddleware.protect, _spokenController["default"].createSpokenLanguage);
privateRoutes.put('/api/spoken-languages/:id', _authMiddleware.protect, _spokenController["default"].updateSpokenLanguage);
privateRoutes["delete"]('/api/spoken-languages/:id', _authMiddleware.protect, _spokenController["default"].deleteSpokenLanguage);

// CERTIFICATES
privateRoutes.get('/api/certificates', _authMiddleware.protect, _certificateController["default"].getAllCertificates);
privateRoutes.post('/api/certificates', _authMiddleware.protect, _certificateController["default"].createCertificate);
privateRoutes.put('/api/certificates/:id', _authMiddleware.protect, _certificateController["default"].updateCertificate);
privateRoutes["delete"]('/api/certificates/:id', _authMiddleware.protect, _certificateController["default"].deleteCertificate);

// CV
privateRoutes.get('/api/cv', _authMiddleware.protect, _cvController["default"].getAllCv);
privateRoutes.post('/api/cv', _authMiddleware.protect, _cvController["default"].createCV);
privateRoutes.put('/api/cv/:id', _authMiddleware.protect, _cvController["default"].updateCV);
privateRoutes["delete"]('/api/cv/:id', _authMiddleware.protect, _cvController["default"].deleteCV);

// ROUTES yang pakai apiKeyMiddleware (tanpa protect & limiter, atau bisa ditambah limiter kalau perlu)
privateRoutes.get('/api/private/tech', _apiKeyMiddleware.apiKeyMiddleware, _techStackController["default"].getTechStackByUserId);
privateRoutes.get('/api/private/spoken', _apiKeyMiddleware.apiKeyMiddleware, _spokenController["default"].getSpokenLanguagesByUserId);
privateRoutes.get('/api/private/programming-languages', _apiKeyMiddleware.apiKeyMiddleware, _programingLanguageController["default"].getProgrammingLangsByUserId);
privateRoutes.get('/api/private/educations', _apiKeyMiddleware.apiKeyMiddleware, _educationsController["default"].getEducationByUserId);
privateRoutes.get('/api/private/cv', _apiKeyMiddleware.apiKeyMiddleware, _cvController["default"].getCV);
privateRoutes.get('/api/private/certificates', _apiKeyMiddleware.apiKeyMiddleware, _certificateController["default"].getAllCertificates);
privateRoutes.get('/api/private/projects', _apiKeyMiddleware.apiKeyMiddleware, _projectsController["default"].getAllProject);
privateRoutes.get('/api/private/projects/:slug', _apiKeyMiddleware.apiKeyMiddleware, _projectsController["default"].getDetailProjectBySlug);
var _default = exports["default"] = privateRoutes;