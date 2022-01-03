const ApiError = require('../error/ApiError')
const {
    Skills,
    Description, Direction
} = require('../models')
const {DataTypes, sequelize} = require("sequelize");


class SkillsController{
    async add(req,res,next){
        const {name,  EducationId} = req.body
        const skills = await Skills.create({name, EducationId})
        return res.json({skills})

    }
    async getAll(req,res){
        try{
            const skills = await Skills.findAll({
                attributes: ['id','name', 'educationId',],
                include: [{
                    model: Description,
                    attributes: ['name']
                }]
            })
            return res.json(skills)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params
            let skills = await Skills.findOne({
                nest: true,
                where: {
                    id: id
                },
                attributes: ['id', 'name', 'educationId',],
                include: [{
                    model: Description,
                    attributes: ['name'],
                }],
            })
            console.log(skills)
            return res.json(skills)
        }catch (e){
            res.status(500).json(e)
        }
    }
}

module.exports = new SkillsController()