const { Job } = require("../models");

function guardAdmin(req, res, next) {
  try {
    if (req.user && req.user.role === "admin") {
      return next();
    }

    throw { name: "Forbidden", message: "Forbidden access" };
  } catch (err) {
    next(err)
  }
}

async function ownerJob(req, res, next) {
  try {
    const { id } = req.params;

    const job = await Job.findByPk(id);

    if (!job) {
      throw { name: "Data Not Found", message: "Job not found" };
    }

    if (req.user.role === "admin") {
      return next();
    }

    if (req.user.id !== job.authorId) {
      throw { name: "Forbidden", message: "Forbidden access" };
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  guardAdmin,
  ownerJob,
};
