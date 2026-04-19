 const express = require('express')
const UserController = require('../controllers/userController')
 const router = express.Router()
 const authentication  = require('../middlewares/authentication')
 
 router.get("/", UserController.addUser);
 
 
 module.exports = router