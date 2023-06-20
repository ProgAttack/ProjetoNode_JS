const db = require('./db')


const Reserva = db.sequelize.define('reserva', {


    dataentrada: {

        type: db.Sequelize.DATE

    },

    datasaida: {

        type: db.Sequelize.DATE
    }




})


module.exports = Reserva

//Reserva.sync({force: true})


