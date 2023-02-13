const router = require('express').Router();
const authController = require('../controllers/auth.controller');


router.get('/', (req, res, next) => res.render('home'))

router.get('/signup', authController.signup);
router.post('/signup', authController.doSignup);

router.get('/login', authController.login);
router.post('/login', authController.doLogin);

router.get('/home', authController.home)

module.exports = router;