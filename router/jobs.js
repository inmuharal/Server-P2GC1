const express = require('express')
const JobController = require('../controllers/jobController')
const router = express.Router()
const { ownerJob } = require('../middlewares/authorization');
const multer = require("multer")

const upload = multer({ storage: multer.memoryStorage() });


router.get('/', JobController.read)
router.post('/', JobController.create)
router.get('/:id', JobController.detail)
router.put('/:id', ownerJob, JobController.update)
router.delete('/:id', ownerJob, JobController.delete)


router.patch(
  "/:id/img",
  ownerJob,
  upload.single('uploadImage'),
  JobController.uploadImage
);


module.exports = router