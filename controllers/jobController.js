const {Job, User, Company} = require('../models')
const cloudinary = require('cloudinary').v2;
const axios = require("axios");
const { Op } = require("sequelize");


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


class JobController {
    static async read(req, res, next) {
        try {
            
            const jobs = await Job.findAll({
                include : [
                    {
                        model : User,
                        attributes : {
                    exclude : ["createdAt", "updatedAt", 'password']
                }   
                    },
                    {
                        model : Company,
                        attributes : {
                    exclude : ["createdAt", "updatedAt"]
                }   
                    }
                ], 
                attributes : {
                    exclude : ["createdAt", "updatedAt"]
                }
            })
            
            res.status(200).json({
                message: "Read Jobs Succeed",
                data: jobs
            })  
            
        } catch (err) {
            next(err)
        }
    }
    
    static async create(req, res, next) {
        try {    
            
            const {title, description, imgUrl, jobType, companyId} = req.body
            const authorId = req.user.id;
            
            const job = await Job.create({title, description, imgUrl, jobType, companyId, authorId})
            
            delete job.dataValues.updatedAt    
            delete job.dataValues.createdAt    
            
            res.status(201).json({
                message: "Succeed create new Job",
                data: job
            })

        } catch (err) {
            // console.log(error);
            next(err)
        }
    }
    
    static async detail(req, res, next) {
        try {
            const { id } = req.params
            
            //Kalo pakai findOne pakai where 
            // const jobs = await Job.findOne({
            //     include : [
            //         {
            //             model : User,
            //             attributes : {
            //         exclude : ["createdAt", "updatedAt"]
            //     }   
            //         },
            //         {
            //             model : Company,
            //             attributes : {
            //         exclude : ["createdAt", "updatedAt"]
            //     }   
            //         }
            //     ], 
            //     attributes : {
            //         exclude : ["createdAt", "updatedAt"]
            //     }, 
            //     where: {
            //         id : id
            //     }
            // })
            
            //pakai findbyPK secara proses lebih cepat
            const job = await Job.findByPk(id, {
                include : [
                    {
                        model : User,
                        attributes : {
                    exclude : ["createdAt", "updatedAt", "password"]
                }   
                    },
                    {
                        model : Company,
                        attributes : {
                    exclude : ["createdAt", "updatedAt"]
                }   
                    }
                ], 
                attributes : {
                    exclude : ["createdAt", "updatedAt"]
                }
            })
            
            if(!job) throw { name : "NotFound"}
            
            res.status(200).json({
                message: `Read Job Succeed with id ${id}`,
                data: job
            })  
            
        } catch (err) {
            next(err)
            
        }
    }
    
    static async delete(req, res, next) {
        try {
            const { id } = req.params
            
            const job = await Job.findByPk(id, {
                include : [
                    {
                        model : User,
                        attributes : {
                    exclude : ["createdAt", "updatedAt", "password"]
                }   
                    },
                    {
                        model : Company,
                        attributes : {
                    exclude : ["createdAt", "updatedAt"]
                }   
                    }
                ], 
                attributes : {
                    exclude : ["createdAt", "updatedAt"]
                }
            })
            
            if(!job) throw { name : "NotFound"}
            
            await job.destroy()
            
            res.status(200).json({
                message: `Delete Job Succeed with id ${id} succeed`,
                data: job
            })  
            
        } catch (err) {
            next(err)
            
        }
    }
    
    static async update(req, res, next) {
        try {
    const { id } = req.params;

    if (Object.keys(req.body).length === 0) {
      throw { name: "BadRequest", message: "Request body cannot be empty" };
    }

    const { title, description, imgUrl, jobType, companyId } = req.body;

    if (!title || !description || !imgUrl || !jobType || !companyId) {
      throw { name: "BadRequest", message: "All fields are required" };
    }

    const job = await Job.findByPk(id);
    if (!job) throw { name: "DataNotFound" };

    await job.update({
      title,
      description,
      imgUrl,
      jobType,
      companyId
    });

    res.status(200).json(job);

  } catch (err) {
    next(err);
  }
    }
    
static async getAllPublic(req, res, next) {
  try {
    const { filter, sort, company, page = 1 } = req.query;

    const where = {};

    if (filter) {
      where.title = {
        [Op.iLike]: `%${filter}%`,
      };
    }

    if (company) {
      where.companyId = +company;
    }

    let order = [["id", "ASC"]];
    if (sort === "DESC") {
      order = [["id", "DESC"]];
    }

    const limit = 10;
    const offset = (page - 1) * limit;

    const data = await Job.findAll({
      where,
      include: [{ model: Company }],
      order,
      limit,
      offset,
      attributes: { exclude: ["authorId", "createdAt", "updatedAt"] },
    });

    res.status(200).json(data);

  } catch (err) {
    next(err);
  }
}
    
    static async getPublicById(req, res, next) {
    try {
      const { id } = req.params;

    if (!id || isNaN(+id)) {
      throw { name: "Data Not Found" };
    }

      const data = await Job.findByPk(id, {
        include: [{ model: Company }],
        attributes: { exclude: ["authorId", "createdAt", "updatedAt"] },
      });

      if (!data) {
        throw { name: "Data Not Found" };
      }

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  
  static async uploadImage(req, res, next) {
    try {
      //! 1. get id from req.params
      const jobId = +req.params.id;

      //! 2. get job using findByPk by req.params.id
      const job = await Job.findByPk(jobId);

      //! 2a. cek apabila job tidak ditemukan (NotFound)
      if (!job) {
        throw { name: "NotFound", message: `Job id ${jobId} not found` };
      }

      //! 3. cek apabila req.file tidak ditemukan (BadRequest)
      if (!req.file) {
        throw { name: "BadRequest", message: "Cover Image is required" };
      }

      //! 4. konversi gambar ke text base64 (req.file.buffer.toString("base64"))
      const base64Img = req.file.buffer.toString("base64");

      //! 5. bikin data url yg benar -> data:[<media-type>][;base64],<data>
      const base64DataUri = `data:${req.file.mimetype};base64,${base64Img}`;

      //! 6. upload ke cloudinary
      const result = await cloudinary.uploader.upload(base64DataUri);

      //! 7. update coverUrl ke db
      await job.update({ imgUrl: result.secure_url });

      //! 8. res status with message : `Job ${job.title} cover url has been updated`
      res.status(200).json({
        message: `Job ${job.title} cover url has been updated`,
      });
    } catch (err) {
      next(err);
    }
  }
  
  
}

module.exports = JobController