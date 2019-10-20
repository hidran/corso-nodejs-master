const User = require('../models').User;
const bc = require('bcrypt');
async function  register({name, email, password}) {

    return  User.create({name, email, password});
}
async function  login({ email, password}) {

    const user =  await User.findOne({ where :{email}});
    if(!user){
        throw new Error ('User not found by email');
    }
     if(!bc.compareSync(password,user.password)){
         throw new Error('Password does not match');
     }
     return user;
}


module.exports = {
    register,
    login
};
