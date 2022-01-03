const ApiError = require('../error/ApiError')
const {Description,
        Skills,
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
}

module.exports = new DescriptionController()