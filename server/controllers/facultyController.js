const ApiError = require('../error/ApiError')
const {Faculty, Description} = require('../models')


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
    async update(req,res){
        try{
            const {id} = req.params
            const faculty = await Faculty.findOne({
                where:{
                    id: id
                }
            });
            if(faculty){
                const updatedFaculty = await faculty.update({
                    name : req.body.name,
                })
                res.status(201).send(updatedFaculty);
            }
            else{
                res.status(404).send("Faculty Not Found");
            }
        }
        catch(e){
            console.log(e);
            res.status(400).send(e);
        }
    }
}

module.exports = new FacultyController()