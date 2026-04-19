const express = require('express')
const router = express.Router()
const jobRouter = require('./jobs')
const userRouter = require('./users')
const companyRouter = require('./companies')

router.get('/',(req,res) => {
    res.redirect('/jobs')
})
router.use('/jobs',jobRouter)
router.use('/users',userRouter)
router.use('/companies',companyRouter)

module.exports = router