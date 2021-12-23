const ApiError = require('../error/ApiError')
const {Specialization,
    Direction,
    Profile,
    Faculty,
    Student,
    Group,
    Education,
    Events,
    Skills
} = require('../models')
const {DataTypes} = require("sequelize");


class EducationController{
    async add(req,res,next){
        try{
            let {StudentId, SpecializationId, skills} = req.body
            const education = await Education.create({StudentId, SpecializationId})

            if (skills) {
                skills = JSON.parse(skills)
                console.log(skills)
                skills.forEach(i =>
                    Skills.create({
                        name: i.name,
                        description: i.description,
                        educationId: education.id
                    })
                )
            }

            return res.json({education})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }


    }
    async getAll(req,res){
        try{
            const education = await Education.findAll({
                attributes: ['id'],
                include: [{
                    model: Student,
                    attributes: ['id','surname','name', 'middle_name','rating_score', 'role', 'email', 'img' ],
                },
                    {
                        model: Specialization,
                        attributes:['id'],
                        include: [{
                            model: Direction,
                            attributes: ['name'],
                        },
                            {
                                model: Profile,
                                attributes: ['name'],
                            },
                            {
                                model: Faculty,
                                attributes: ['name'],
                            },
                            {
                                model: Events,
                                attributes: ['name', 'type', 'data_begin', 'data_end', 'img'],
                            }]
                    }
                    ],
            })
            return res.json(education)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params
            const education = await Education.findOne({
                where:{
                    id: id
                },
                attributes: ['id'],
                include: [
                    {model: Skills,
                        where:{
                            EducationId: id
                        },
                        attributes: ['id', 'name', 'description']
                    },
                    {
                    model: Student,
                    attributes: ['id','surname','name', 'middle_name','rating_score', 'role', 'email', 'img' ],
                },
                    {
                        model: Specialization,
                        attributes:['id'],
                        include: [{
                            model: Direction,
                            attributes: ['name'],
                        },
                            {
                                model: Profile,
                                attributes: ['name'],
                            },
                            {
                                model: Faculty,
                                attributes: ['name'],
                            },{
                                model: Events,
                                attributes: ['name', 'type', 'data_begin', 'data_end', 'img'],
                            }]
                    }
                ],
            })
            return res.json(education)
        }catch (e){
            res.status(500).json(e)
        }
    }
}


module.exports = new EducationController()