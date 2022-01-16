const ApiError = require('../error/ApiError')
const {Specialization,
        Direction,
        Profile,
        Faculty,
        Events,
        Group, Description,
} = require('../models')


class SpecializationController{
    async add(req,res,next){
        const {DirectionId, FacultyId, ProfileId, EventId} = req.body
        const specialization = await Specialization.create({DirectionId, FacultyId, ProfileId, EventId})
        return res.json({specialization})

    }
    async getAll(req,res){
        try{
           /* const direction = await Direction.findAll({
                raw: true,
                attributes: ['name']
            })
            const profile = await Profile.findAll({
                raw: true,
                attributes: ['name'],
            })
            const faculty = await Faculty.findAll({
                raw: true,
                attributes: ['name'],
            })
            const events = await Events.findAll({
                raw: true,
                attributes: ['name', 'type', 'data_begin', 'data_end', 'img'],
            })*/
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
            console.log(specialization)
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
    async update(req,res){
        try{
            const {id} = req.params
            const specialization = await Specialization.findOne({
                where:{
                    id: id
                }
            });
            if(specialization){
                const updatedSpecialization = await specialization.update({
                    DirectionId : req.body.DirectionId,
                    FacultyId: req.body.FacultyId,
                    ProfileId: req.body.ProfileId,
                    EventId: req.body.EventId,
                })
                res.status(201).send(updatedSpecialization);
            }
            else{
                res.status(404).send("Specialization Not Found");
            }
        }
        catch(e){
            console.log(e);
            res.status(400).send(e);
        }
    }
}

module.exports = new SpecializationController()