const ApiError = require('../error/ApiError')
const {Work, Description,
} = require('../models')


class WorkController{
    async add(req,res,next){
        const {VacancyId, StudentId} = req.body
        const work = await Work.create({VacancyId, StudentId})
        return res.json({work})

    }
    async getAll(req,res){
        try{
            const work = await Work.findAll({
                attributes: ['id','VacancyId', 'StudentId'],
            })
            return res.json(work)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params
            const work = await Work.findOne({
                where:{
                    id: id
                },
                attributes: ['id','VacancyId', 'StudentId'],
            })
            return res.json(work)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async update(req,res){
        try{
            const {id} = req.params
            const work = await Work.findOne({
                where:{
                    id: id
                }
            });
            if(work){
                const updatedWork = await work.update({
                    VacancyId : req.body.VacancyId,
                    StudentId: req.body.StudentId
                })
                res.status(201).send(updatedWork);
            }
            else{
                res.status(404).send("Work Not Found");
            }
        }
        catch(e){
            console.log(e);
            res.status(400).send(e);
        }
    }
}

module.exports = new WorkController()