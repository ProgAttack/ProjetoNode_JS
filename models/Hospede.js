const db = require('./db')


const Hospede = db.sequelize.define('hospede', {


    nomehospede: {

        type: db.Sequelize.TEXT

    },

    cpf: {

        type: db.Sequelize.TEXT
    }


})

module.exports = Hospede


//Hospede.sync({force: true})







