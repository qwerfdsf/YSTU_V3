const ApiError = require('../error/ApiError')
const {Work,
} = require('../models')


class WorkController{
    async add(req,res,next){
        const {VacancyId, StudentId} = req.body
        const work = await Work.create({VacancyId, StudentId})
        return res.json({work})

    }
    async getAll(req,res){
        try{
            const work = await Work.findAll({
                attributes: ['id','VacancyId', 'StudentId'],
            })
            return res.json(work)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params
            const work = await Work.findOne({
                where:{
                    id: id
                },
                attributes: ['id','VacancyId', 'StudentId'],
            })
            return res.json(work)
        }catch (e){
            res.status(500).json(e)
        }
    }
}

module.exports = new WorkController()