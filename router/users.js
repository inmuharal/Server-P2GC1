 const express = require('express')
const UserController = require('../controllers/UserController')
 const router = express.Router()
 const authentication  = require('../middlewares/authentication')
 
 router.get("/", UserController.addUser);
 
 
 module.exports = router