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
})

const Description = sequelize.define('description',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING},
})

// работа
const Work = sequelize.define('Work',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Employer = sequelize.define('Employer',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    surname:{type: DataTypes.STRING, defaultValue: "Axmetzyanov"},
    name:{type: DataTypes.STRING, defaultValue: "Aleksei"},
    middle_name:{type: DataTypes.STRING, defaultValue: "Alekseevich"},
    email:{type: DataTypes.STRING, unique:true},
    password:{type: DataTypes.STRING},
    //rating_score:{type: DataTypes.INTEGER, defaultValue: 0},
    role:{type: DataTypes.STRING, defaultValue: "WORK"},
    img:{type: DataTypes.STRING}
})

const Company = sequelize.define('Company',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, defaultValue: "Areal"},
    Description:{type: DataTypes.STRING, defaultValue: "WEB-разработка"},
})

const Vacancy = sequelize.define('Vacancy',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, defaultValue: "WEB-разработчик"},
    position:{type: DataTypes.STRING, defaultValue: "frontend"},
    direction:{type: DataTypes.STRING, defaultValue: "WEB-разработка"},
    requirements:{type: DataTypes.STRING, defaultValue: "Знание css, html, Вади"},
})

Company.hasMany(Vacancy)
Vacancy.belongsTo(Company)

Company.hasMany(Employer)
Employer.belongsTo(Company)

Vacancy.hasMany(Work)
Work.belongsTo(Vacancy)

Student.hasMany(Work)
Work.belongsTo(Student)

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

Skills.hasMany(Description);
Description.belongsTo(Skills)

module.exports = {
    Student,
    Group,
    Direction,
    Events,
    Faculty,
    Profile,
    Specialization,
    Education,
    Skills,
    Description,
    Work,
    Employer,
    Company,
    Vacancy,

}