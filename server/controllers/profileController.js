const ApiError = require('../error/ApiError')
const {Profile} = require('../models')


class ProfileController{
    async add(req,res,next){
        const {name} = req.body
        if (!name){
            return next(ApiError.badRequest('не правильное название профиля'))
        }
        const profileName = await Profile.findOne({where:{name}})
        if (profileName){
            return next(ApiError.badRequest('Профиль с таким названием существует'))
        }
        const profile = await Profile.create({name})
        return res.json({profile})

    }
    async getAll(req,res){
        try{
            const profile = await Profile.findAll({
                attributes: ['id','name']
            })
            return res.json(profile)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params
            const profile = await Profile.findOne({
                where:{
                    id: id
                },
                attributes: ['id','name'],
            })
            return res.json(profile)
        }catch (e){
            res.status(500).json(e)
        }
    }
}

module.exports = new ProfileController()