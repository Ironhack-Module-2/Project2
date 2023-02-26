const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const roleController = require("../controllers/role.controller");
const createController = require("../controllers/create.controller");
const appController = require("../controllers/application.controller");
const profileController = require("../controllers/profile.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const upload = require("../config/cloudinary.config");

//const roleMiddleware = require('../middlewares/role.middleware');

router.get("/", (req, res, next) => res.render("home"));

router.get("/signup", authMiddleware.isNotAuthenticated, authController.signup);
router.post(
  "/signup",
  authMiddleware.isNotAuthenticated,
  authController.doSignup
);

router.get("/login", authMiddleware.isNotAuthenticated, authController.login);
router.post(
  "/login",
  authMiddleware.isNotAuthenticated,
  authController.doLogin
);

router.get("/logout", authMiddleware.isAuthenticated, authController.doLogout);

router.get(
  "/home",
  authMiddleware.isAuthenticated,
  roleMiddleware.isFullfilled,
  roleController.home
);

router.get("/create", authMiddleware.isAuthenticated, createController.create);
router.post(
  "/create",
  authMiddleware.isAuthenticated,
  createController.doCreate
);

router.post('/jobs/:id/delete', 
authMiddleware.isAuthenticated, 
createController.delete)

router.get('/jobs/:id/edit', 
authMiddleware.isAuthenticated,
createController.edit
);

router.post('/jobs/:id/edit',
authMiddleware.isAuthenticated,
createController.doEdit
);



router.post(
  "/jobs/:id/delete",
  authMiddleware.isAuthenticated,
  createController.delete
);

router.get(
  "/jobs/:id/edit",
  authMiddleware.isAuthenticated,
  createController.edit
);

router.post(
  "/jobs/:id/edit",
  authMiddleware.isAuthenticated,
  createController.doEdit
);

router.post(
  "/profile/:id/:appId/deleteapp",
  authMiddleware.isAuthenticated,
  appController.delete
);

router.post(
  "/jobs/:id/application",
  authMiddleware.isAuthenticated,
  appController.createApp
);

//router.get("/home", authMiddleware.isAuthenticated, roleController.artist);

router.get(
  "/profile",
  authMiddleware.isAuthenticated,
  profileController.isArtist
);

router.get(
  "/profile/:id/:appId/detail",
  authMiddleware.isAuthenticated,
  profileController.detail
);

router.post(
  "/profile/:id/:appId/message",
  authMiddleware.isAuthenticated,
  profileController.message
);

router.post(
  "/profile/:id/:appId/confirm",
  authMiddleware.isAuthenticated,
  profileController.confirm
);

//router.get("/perfil", verficarUser, perfilForm);
//router.post("/perfil", verficarUser, cambiarFotoPerfil);

router.get(
  "/profile-set",
  authMiddleware.isAuthenticated,
  roleController.updateArtist
);

router.post(
  "/profile-set",
  upload.single("image"),
  roleController.doUpdateArtist
);

router.get(
  "/home-artist",
  authMiddleware.isAuthenticated,
  roleController.homeArtist
);

router.get(
  "/candidates",
  authMiddleware.isAuthenticated,
  roleMiddleware.isHunter,
  roleController.candidatesList
);

router.get(
  "/confirmation",
  authMiddleware.isAuthenticated,
  profileController.messageSent
);

module.exports = router;
