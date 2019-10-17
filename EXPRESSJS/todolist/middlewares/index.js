const methodOverride = require('method-override');
const session = require('express-session');
const DEFAULT_ENV = process.env.DEFAULT_ENV || 'development';
const MAX_AGE = process.env.MAX_AGE ||  60*60*1000;
const SECRET = process.env.SECRET ||  'Our beautiful secret';
const  redirectHome = (req, resp, next)=>{
    if(req.session.user){
        resp.redirect('/');
    } else {
        next();
    }
};

const  redirectLogin = (req, resp, next)=>{
    if(!req.session.user){
        resp.redirect('/auth/login');
    } else {
        next();
    }
};
const setSession = () => {
     return   session({
            cookie: {
                maxAge: MAX_AGE,
                secure: DEFAULT_ENV === 'production'
            },

            secret: SECRET,
            resave: false,
            saveUninitialized: false,
        });
    }
;
const overrideMethods = () =>{
    return  methodOverride(function (req, res) {
        console.log('override');
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method
            delete req.body._method
            return method
        }
    })
};
module.exports = {
    redirectHome,
    redirectLogin,
    setSession,
    overrideMethods
}

