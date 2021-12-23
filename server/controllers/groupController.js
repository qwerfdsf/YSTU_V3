const ApiError = require('../error/ApiError')
const {Student, Group, Rating} = require('../models')


class GroupController{
    async add(req,res,next){
        const {name} = req.body
        if (!name){
            return next(ApiError.badRequest('не правильное название группы'))
        }
        const groupName = await Group.findOne({where:{name}})
        if (groupName){
            return next(ApiError.badRequest('Группа с таким названием существует'))
        }
        const group = await Group.create({name})
        console.log(res)
        return res.json({group})

    }
    async getAll(req,res){
        try{
            const group = await Group.findAll({
                    attributes: ['id','name']
                })
            return res.json(group)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params
            const group = await Group.findOne({
                where:{
                    id: id
                },
                attributes: ['id','name'],
            })
            return res.json(group)
        }catch (e){
            res.status(500).json(e)
        }
    }
}

module.exports = new GroupController()