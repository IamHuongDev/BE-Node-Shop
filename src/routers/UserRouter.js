const express = require("express");

const router = express.Router()

const UserController = require('../controllers/UserController');
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

router.post('/sign-up', UserController.createUser)
router.post('/sign-in', UserController.loginUser)
router.post('/log-out', UserController.logoutUser)
router.put('/update-user/:id',authUserMiddleWare, UserController.updateUser)
router.delete('/delete-user/:id',authMiddleWare, UserController.deleteUser)
router.get('/get-all',authMiddleWare, UserController.getAllUser)
router.get('/get-detail/:id',authUserMiddleWare, UserController.getDetailUser)
router.post('/refresh-token', UserController.refreshToken)

module.exports = router;