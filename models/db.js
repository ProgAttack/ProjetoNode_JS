const Sequelize = require('sequelize')

//Conexão com o banco de dados

const sequelize = new Sequelize('hostel', 'root', '1234', {
    host: "localhost",
    dialect: 'mysql',
    query:{raw:true}
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}



//BANCO DE DADOS 