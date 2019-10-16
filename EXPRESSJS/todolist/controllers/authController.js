const User = require('../models').User;

async function  register({name, email, password}) {

    return  User.create({name, email, password});
}
module.exports = {
    register
}
