const db = require('./db')


const Cama = db.sequelize.define('cama', {

    quantidade: {
        type: db.Sequelize.INTEGER
    }



})

module.exports = Cama

//Cama.sync({force: true})