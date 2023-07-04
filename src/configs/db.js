const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('LM Computer Shop management system', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    timezone: '+07:00',
    port:8111
});

sequelize.authenticate()
    .then(() => {
        console.log('DB connection established successfully')
    })
    .catch((error) => {
        console.log(error)
    })


sequelize.sync();

module.exports = sequelize