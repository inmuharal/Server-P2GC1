const router = require('express').Router()
const JobController = require('../controllers/jobController')
const CompanyController = require('../controllers/companyController')

router.get('/jobs', JobController.getAllPublic)
router.get('/jobs/:id', JobController.getPublicById)
router.get('/companies', CompanyController.read)

module.exports = router