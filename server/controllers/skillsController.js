const ApiError = require('../error/ApiError')
const {Skills} = require('../models')
const {DataTypes} = require("sequelize");


class SkillsController{
    async add(req,res,next){
        const {name, description, EducationId} = req.body
        const skills = await Skills.create({name, description, EducationId})
        return res.json({skills})

    }
    async getAll(req,res){
        try{
            const skills = await Skills.findAll({
                attributes: ['id','name', 'description', 'educationId']
            })
            return res.json(skills)
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

module.exports = new SkillsController()