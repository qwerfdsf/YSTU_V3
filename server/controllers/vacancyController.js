const ApiError = require('../error/ApiError')
const {Vacancy, Company,
} = require('../models')


class VacancyController{
    async add(req,res,next){
        const {name, position, direction, requirements, CompanyId} = req.body
        const vacancy = await Vacancy.create({name, position, direction, requirements, CompanyId})
        return res.json({vacancy})

    }
    async getAll(req,res){
        try{
            const vacancy = await Vacancy.findAll({
                attributes: ['id','name', 'position', 'direction', 'requirements', 'CompanyId'],
            })
            return res.json(vacancy)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params
            const vacancy = await Vacancy.findOne({
                where:{
                    id: id
                },
                attributes: ['id','name', 'position', 'direction', 'requirements', 'CompanyId'],
                include:[{
                    model: Company,
                    attributes: ['name', 'Description']
                }]
            })
            return res.json(vacancy)
        }catch (e){
            res.status(500).json(e)
        }
    }
}

module.exports = new VacancyController()