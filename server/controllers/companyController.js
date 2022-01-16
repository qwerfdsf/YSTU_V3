const ApiError = require('../error/ApiError')
const {Company, Group,
                } = require('../models')


class CompanyController{
    async add(req,res,next){
        const {name, description} = req.body
        const company = await Company.create({name, description})
        return res.json({company})

    }
    async getAll(req,res){
        try{
            const company = await Company.findAll({
                attributes: ['id','name', 'description'],
            })
            return res.json(company)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params
            const company = await Company.findOne({
                where:{
                    id: id
                },
                attributes: ['id','name', 'description'],
            })
            return res.json(company)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async update(req,res){
        try{
            const {id} = req.params
            const company = await Company.findOne({
                where:{
                    id: id
                }
            });
            if(company){
                const updatedCompany = await company.update({
                    name : req.body.name,
                    description: req.body.description
                })
                res.status(201).send(updatedCompany);
            }
            else{
                res.status(404).send("Company Not Found");
            }
        }
        catch(e){
            console.log(e);
            res.status(400).send(e);
        }
    }
}

module.exports = new CompanyController()