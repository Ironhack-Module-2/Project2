
const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const roleController = require('../controllers/role.controller');
const createController = require('../controllers/create.controller');
const appController = require('../controllers/application.controller');
const authMiddleware = require('../middlewares/auth.middleware');


//const roleMiddleware = require('../middlewares/role.middleware');

//const fileUploader = require('../config/cloudinary.config');


router.get('/', (req, res, next) => res.render('home'))

router.get('/signup', authMiddleware.isNotAuthenticated, authController.signup);
router.post('/signup', authMiddleware.isNotAuthenticated, authController.doSignup);

router.get('/login', authMiddleware.isNotAuthenticated, authController.login);
router.post('/login', authMiddleware.isNotAuthenticated, authController.doLogin);

router.get('/logout', authMiddleware.isAuthenticated, authController.doLogout);

router.get('/home', authMiddleware.isAuthenticated, roleController.home);

router.get('/create', authMiddleware.isAuthenticated, createController.create);
router.post('/create', authMiddleware.isAuthenticated, createController.doCreate);

router.get( "/profile-set", authMiddleware.isAuthenticated, roleController.updateArtist);
router.post('/profile-set', authMiddleware.isAuthenticated, roleController.doUpdateArtist )

//router.post('/jobs/:id/application', authMiddleware.isAuthenticated, appController.createApp);

router.get('/home', authMiddleware.isAuthenticated, roleController.artist)




/router.get( "/home-artist", authMiddleware.isAuthenticated, roleController.homeArtist);

module.exports = router;


