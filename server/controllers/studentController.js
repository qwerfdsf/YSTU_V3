const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const path = require('path');
const {Student, Group, Rating, Description} = require('../models')


const generateJwt = (id, email)=>{
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}


class StudentController{
    async registration(req,res,next){
        const {surname, name, middle_name, email, password, GroupId,rating_score, role} = req.body
        if (!email || !password){
            return next(ApiError.badRequest('не правильный email или password'))

        }
        const candidate = await Student.findOne({where:{email}})
        if (candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже сущетвует'))
        }
        const {img} = req.files
        let filename = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', filename))
        const hashPassword = await bcrypt.hash(password, 5)
        const student = await Student.create({surname, name, middle_name, rating_score,
                                                    email, GroupId, img:filename, password: hashPassword})
        //const rating = await Rating.create({id: student.id})
        const token = generateJwt(student.id, student.email)
        return res.json({token})
        }

    async login(req,res,next){
        const {email, password} = req.body
        const student = await Student.findOne({where:{email}})
        if (!student){
            return next(ApiError.internal('Пользователь с таким email не сущетвует'))
        }
        let comparePassword = bcrypt.compareSync(password, student.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        console.log(res)
        const token = generateJwt(student.id, student.email)
        return res.json({token})
    }

    async check(req,res,next){
        const token = generateJwt(req.student.id, req.student.email)
        return res.json({token})
    }
    async getAll(req,res){
        try{
            const students = await Student.findAll({
                attributes: ['id','surname','name', 'middle_name','rating_score', 'role', 'email', 'img' ],
                include: [{
                model: Group,
                attributes: ['name']
                }]
            })
            return res.json(students)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params
            const students = await Student.findOne({
                where:{
                    id: id
                },
                attributes: ['id','surname','name', 'middle_name','rating_score', 'role', 'email', 'img' ],
                include: [{
                    model: Group,
                    attributes: ['name']
                }]
            })
            return res.json(students)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async update(req,res){
        try{
            const {id} = req.params
            const students = await Student.findOne({
                where:{
                    id: id
                }
            });
            if(students){
                const updatedStudents = await students.update({
                    name : req.body.name,
                    surname: req.body.surname,
                    middle_name: req.body.middle_name,
                    email: req.body.email,
                    password: req.body.password,
                    GroupId: req.body.GroupId,
                })
                res.status(201).send(updatedStudents);
            }
            else{
                res.status(404).send("Students Not Found");
            }
        }
        catch(e){
            console.log(e);
            res.status(400).send(e);
        }
    }
}

module.exports = new StudentController()