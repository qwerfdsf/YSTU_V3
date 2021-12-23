const ApiError = require('../error/ApiError')
const {Direction} = require('../models')


class DirectionController{
    async add(req,res,next){
        const {name} = req.body
        if (!name){
            return next(ApiError.badRequest('не правильное название направления'))
        }
        const directionName = await Direction.findOne({where:{name}})
        if (directionName){
            return next(ApiError.badRequest('Направление с таким названием существует'))
        }
        const direction = await Direction.create({name})
        return res.json({direction})

    }
    async getAll(req,res){
        try{
            const direction = await Direction.findAll({
                attributes: ['id','name']
            })
            return res.json(direction)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params
            const direction = await Direction.findOne({
                where:{
                    id: id
                },
                attributes: ['id','name'],
            })
            return res.json(direction)
        }catch (e){
            res.status(500).json(e)
        }
    }
}

module.exports = new DirectionController()