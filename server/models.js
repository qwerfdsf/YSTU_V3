const  sequelize = require('./connectdb')
const {DataTypes, Sequelize} = require('sequelize')


const Group = sequelize.define('Group',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique:true},
})


const Student = sequelize.define('Student',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    surname:{type: DataTypes.STRING, defaultValue: "Axmetzyanov"},
    name:{type: DataTypes.STRING, defaultValue: "Aleksei"},
    middle_name:{type: DataTypes.STRING, defaultValue: "Alekseevich"},
    email:{type: DataTypes.STRING, unique:true},
    password:{type: DataTypes.STRING},
    rating_score:{type: DataTypes.INTEGER, defaultValue: 0},
    role:{type: DataTypes.STRING, defaultValue: "STUDENT"},
    img:{type: DataTypes.STRING}
})

const Direction = sequelize.define('Direction',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique:true},
})

const Profile = sequelize.define('Profile',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique:true},
})

const Faculty = sequelize.define('Faculty',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique:true},
})

const Events = sequelize.define('Events',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING},
    type:{type: DataTypes.STRING},
    data_begin:{type: DataTypes.DATEONLY},
    data_end:{type: DataTypes.DATEONLY},
    img:{type: DataTypes.STRING}
})

const Specialization = sequelize.define('Specialization',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Education = sequelize.define('Education',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


const Skills = sequelize.define('Skills',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING},
    description:{type: DataTypes.STRING},
})



Group.hasMany(Student)
Student.belongsTo(Group)

Profile.hasMany(Specialization)
Specialization.belongsTo(Profile)

Faculty.hasMany(Specialization)
Specialization.belongsTo(Faculty)

Direction.hasMany(Specialization)
Specialization.belongsTo(Direction)

Events.hasMany(Specialization)
Specialization.belongsTo(Events)

Student.hasMany(Education)
Education.belongsTo(Student)

Specialization.hasMany(Education)
Education.belongsTo(Specialization)

Education.hasMany(Skills);
Skills.belongsTo(Education)

module.exports = {
    Student,
    Group,
    Direction,
    Events,
    Faculty,
    Profile,
    Specialization,
    Education,
    Skills

}