const { Company, Job, User } = require('../models')

class CompanyController {
    static async read(req, res, next) {
        try {
            const companies = await Company.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })

            res.status(200).json(companies)

        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {
        try {
            const { name, companyLogo, location, email, description } = req.body

            const company = await Company.create({ name, companyLogo, location, email, description })

            delete company.dataValues.updatedAt
            delete company.dataValues.createdAt

            res.status(201).json({
                message: "Succeed create new Company",
                data: company
            })

        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const { name, companyLogo, location, email, description } = req.body

            const company = await Company.findByPk(id, {
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })

            if (!company) throw { name: "NotFound", message: "Company not found" }

            await company.update({ name, companyLogo, location, email, description })

            res.status(200).json({
                message: `Update company with id ${id} succeed`,
                data: company
            })

        } catch (error) {
            next(error)
        }
    }

    static async getAllPublic(req, res, next) {
        try {
            const companies = await Company.findAll({
                attributes: { exclude: ["createdAt", "updatedAt"] }
            })

            res.status(200).json(companies)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CompanyController