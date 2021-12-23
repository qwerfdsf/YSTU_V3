const ApiError = require('../error/ApiError')
const {Events} = require('../models')
const {DataTypes} = require("sequelize");
const uuid = require("uuid");
const path = require("path");


class EventsController{
    async add(req,res,next){
        const {name, type, data_begin, data_end} = req.body
        if (!name){
            return next(ApiError.badRequest('не правильное название мероприятия'))
        }
        const {img} = req.files
        let filename = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', filename))
        const events = await Events.create({name, type, data_begin, data_end, img:filename})
        return res.json({events})

    }
    async getAll(req,res){
        try{
            const events = await Events.findAll({
                attributes: ['id','name', 'type', 'data_begin', 'data_end', 'img']
            })
            return res.json(events)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params
            const events = await Events.findOne({
                where:{
                    id: id
                },
                attributes: ['id','name', 'type', 'data_begin', 'data_end', 'img'],
            })
            return res.json(events)
        }catch (e){
            res.status(500).json(e)
        }
    }
}

module.exports = new EventsController()