var express = require('express');

var userController = require('../src/user/userController');
const router = express.Router();

var id
// ruta para login
router.route('/user/login').post(userController.loginUserControllerFunc);
// ruta para crear usuario
router.route('/user/create').post(userController.createUserControllerFunc);

router.route('/user').get(userController.allUserControllerFunc);

router.route('/user/search/:id').get(userController.oneUSerControllerFunc);

router.route('/user/delete/:id').delete(userController.deleteUserControllerFunc);


module.exports = router;
