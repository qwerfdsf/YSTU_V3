const ApiError = require('../error/ApiError')
const {Company,
                } = require('../models')


class CompanyController{
    async add(req,res,next){
        const {name, description} = req.body
        const company = await Company.create({name, description})
        return res.json({company})

    }
    async getAll(req,res){
        try{
            const company = await Company.findAll({
                attributes: ['id','name', 'description'],
            })
            return res.json(company)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params
            const company = await Company.findOne({
                where:{
                    id: id
                },
                attributes: ['id','name', 'description'],
            })
            return res.json(company)
        }catch (e){
            res.status(500).json(e)
        }
    }
}

module.exports = new CompanyController()