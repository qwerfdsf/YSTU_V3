const ApiError = require('../error/ApiError')
const {Specialization,
        Direction,
        Profile,
        Faculty,
        Events,
        Group
} = require('../models')


class SpecializationController{
    async add(req,res,next){
        const {DirectionId, FacultyId, ProfileId, EventId} = req.body
        const specialization = await Specialization.create({DirectionId, FacultyId, ProfileId, EventId})
        return res.json({specialization})

    }
    async getAll(req,res){
        try{
            const specialization = await Specialization.findAll({
                attributes: ['id'],
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
                    },]
            })
            return res.json(specialization)
        }catch (e){
            res.status(500).json(e)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params
            const specialization = await Specialization.findOne({
                where:{
                    id: id
                },
                attributes: ['id'],
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
                    }],
            })
            return res.json(specialization)
        }catch (e){
            res.status(500).json(e)
        }
    }
}

module.exports = new SpecializationController()