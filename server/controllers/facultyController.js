const ApiError = require('../error/ApiError')
const {Faculty} = require('../models')


class FacultyController{
    async add(req,res,next){
        const {name} = req.body
        if (!name){
            return next(ApiError.badRequest('не правильное название института'))
        }
        const facultyName = await Faculty.findOne({where:{name}})
        if (facultyName){
            return next(ApiError.badRequest('Институ с таким названием существует'))
        }
        const faculty = await Faculty.create({name})
        return res.json({faculty})

    }
    async getAll(req,res){
        try{
            const faculty = await Faculty.findAll({
                attributes: ['id','name']
            })
            return res.json(faculty)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params
            const faculty = await Faculty.findOne({
                where:{
                    id: id
                },
                attributes: ['id','name'],
            })
            return res.json(faculty)
        }catch (e){
            res.status(500).json(e)
        }
    }
}

module.exports = new FacultyController()