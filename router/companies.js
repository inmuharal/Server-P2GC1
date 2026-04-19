const express = require('express')
const CompanyController = require('../controllers/companyController')
const router = express.Router()
const authentication  = require('../middlewares/authentication')
 
 router.get('/',CompanyController.read)
 router.post('/',CompanyController.create)
 router.put('/:id',CompanyController.update)
 
 router.get("/pub/companies", CompanyController.getAllPublic);
 
 module.exports = router