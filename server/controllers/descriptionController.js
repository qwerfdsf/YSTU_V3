const ApiError = require('../error/ApiError')
const {Description,
        Skills, Company,
        } = require('../models')


class DescriptionController{
    async add(req,res,next){
        const {name, SkillId} = req.body
        const description = await Description.create({name, SkillId})
        return res.json({description})

    }
    async getAll(req,res){
        try{
            const description = await Description.findAll({
                attributes: ['id','name', 'SkillId'],
                include:[{
                    model: Skills,
                    attributes: ['name']
                }]
            })
            return res.json(description)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params
            const description = await Description.findOne({
                where:{
                    id: id
                },
                attributes: ['id','name', 'SkillId'],
                include:[{
                    model: Skills,
                    attributes: ['name']
                }]
            })
            return res.json(description)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async update(req,res){
        try{
            const {id} = req.params
            const description = await Description.findOne({
                where:{
                    id: id
                }
            });
            if(description){
                const updatedDescription = await description.update({
                    name : req.body.name,
                    SkillId: req.body.SkillId
                })
                res.status(201).send(updatedDescription);
            }
            else{
                res.status(404).send("Description Not Found");
            }
        }
        catch(e){
            console.log(e);
            res.status(400).send(e);
        }
    }
}

module.exports = new DescriptionController()