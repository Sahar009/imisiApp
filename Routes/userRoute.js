const express = require('express');
const { registerUser, loginUser, logOutUser, getUser, loggedInStatus, UpdateUser, ChangePassword, forgotpassword, resetPassword } = require('../controllers/userController');
const protect = require('../middleware/Authmiddleware');
const router = express.Router()


router.post("/register", registerUser)
router.post('/login', loginUser)
router.get('/logout', logOutUser);
router.get('/getuser',protect, getUser);
router.get('/loggedin', loggedInStatus);
router.patch('/updateuser',protect, UpdateUser);
router.patch('/changepassword',protect, ChangePassword);
router.post('/forgotpassword', forgotpassword)
router.put('/resetpassword/:resetToken', resetPassword)

module.exports = router