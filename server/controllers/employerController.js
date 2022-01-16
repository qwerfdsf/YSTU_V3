const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const path = require('path');
const {Employer, Company, Description} = require('../models')


const generateJwt = (id, email)=>{
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}


class EmployerController{
    async registration(req,res,next){
        const {surname, name, middle_name, email, password, CompanyId, role} = req.body
        if (!email || !password){
            return next(ApiError.badRequest('не правильный email или password'))
        }
        const candidate = await Employer.findOne({where:{email}})
        if (candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже сущетвует'))
        }
        const {img} = req.files
        let filename = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', filename))
        const hashPassword = await bcrypt.hash(password, 5)
        const employer = await Employer.create(
            {surname, name, middle_name,
                    email, CompanyId, img:filename,
                    password: hashPassword})
        const token = generateJwt(employer.id, employer.email)
        return res.json({token})
    }

    async login(req,res,next){
        const {email, password} = req.body
        const employer = await Employer.findOne({where:{email}})
        if (!employer){
            return next(ApiError.internal('Пользователь с таким email не сущетвует'))
        }
        let comparePassword = bcrypt.compareSync(password, employer.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        console.log(res)
        const token = generateJwt(employer.id, employer.email)
        return res.json({token})
    }

    async check(req,res,next){
        const token = generateJwt(req.employer.id, req.employer.email)
        return res.json({token})
    }
    async getAll(req,res){
        try{
            const employer = await Employer.findAll({
                attributes: ['id','surname','name', 'middle_name','CompanyId', 'role', 'email', 'img' ],
                include: [{
                    model: Company,
                    attributes: ['name', 'Description']
                }]
            })
            return res.json(employer)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params
            const employer = await Employer.findOne({
                where:{
                    id: id
                },
                attributes: ['id','surname','name', 'middle_name','CompanyId', 'role', 'email', 'img' ],
                include: [{
                    model: Company,
                    attributes: ['name', 'Description']
                }]
            })
            return res.json(employer)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async update(req,res){
        try{
            const {id} = req.params
            const employer = await Employer.findOne({
                where:{
                    id: id
                }
            });
            if(employer){
                const updatedEmployer = await employer.update({
                    name : req.body.name,
                    surname: req.body.surname,
                    middle_name: req.body.middle_name,
                    email: req.body.email,
                    password: req.body.password,
                    CompanyId: req.body.CompanyId,

                })
                res.status(201).send(updatedEmployer);
            }
            else{
                res.status(404).send("Employer Not Found");
            }
        }
        catch(e){
            console.log(e);
            res.status(400).send(e);
        }
    }
}

module.exports = new EmployerController()