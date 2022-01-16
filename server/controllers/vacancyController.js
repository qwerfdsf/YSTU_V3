const ApiError = require('../error/ApiError')
const {Vacancy, Company, Description,
} = require('../models')


class VacancyController{
    async add(req,res,next){
        const {name, position, direction, requirements, CompanyId} = req.body
        const vacancy = await Vacancy.create({name, position, direction, requirements, CompanyId})
        return res.json({vacancy})

    }
    async getAll(req,res){
        try{
            const vacancy = await Vacancy.findAll({
                attributes: ['id','name', 'position', 'direction', 'requirements', 'CompanyId'],
            })
            return res.json(vacancy)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params
            const vacancy = await Vacancy.findOne({
                where:{
                    id: id
                },
                attributes: ['id','name', 'position', 'direction', 'requirements', 'CompanyId'],
                include:[{
                    model: Company,
                    attributes: ['name', 'Description']
                }]
            })
            return res.json(vacancy)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async update(req,res){
        try{
            const {id} = req.params
            const vacancy = await Vacancy.findOne({
                where:{
                    id: id
                }
            });
            if(vacancy){
                const updatedVacancy = await vacancy.update({
                    name : req.body.name,
                    position: req.body.position,
                    direction: req.body.direction,
                    requirements: req.body.requirements,
                    CompanyId: req.body.CompanyId,
                })
                res.status(201).send(updatedVacancy);
            }
            else{
                res.status(404).send("Vacancy Not Found");
            }
        }
        catch(e){
            console.log(e);
            res.status(400).send(e);
        }
    }
}

module.exports = new VacancyController()