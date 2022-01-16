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
    async update(req,res){
        try{
            const {id} = req.params
            let skills = await Skills.findOne({
                where:{
                    id: id
                }
            });
            if(skills){
                const updatedSkills = await skills.update({
                    name : req.body.name,
                    EducationId: req.body.EducationId

                })
                res.status(201).send(updatedSkills);
            }
            else{
                res.status(404).send("Skills Not Found");
            }
        }
        catch(e){
            console.log(e);
            res.status(400).send(e);
        }
    }
}

module.exports = new SkillsController()