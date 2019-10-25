const methodOverride = require('method-override');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const List = require('../models').List;
const fileStoreOptions = {};
const DEFAULT_ENV = process.env.DEFAULT_ENV || 'development';
const MAX_AGE = process.env.MAX_AGE ||  60*60*1000;
const SECRET = process.env.SECRET ||  'Our beautiful secret';
const  redirectHome = (req, resp, next)=>{
    if(req.session.user && !req.path === '/auth/logout'){
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
         store: new FileStore(fileStoreOptions),
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
    return  methodOverride(function (req) {

        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method
            delete req.body._method;
            return method
        };
    })
};
const  manageFilter = (req,resp,next) =>{
    let  {completed } = req.query;
    if(completed !== undefined){
        req.session.completed = completed;
    } else {
        if(req.session.completed){
            req.query.completed = req.session.completed;
        }

    }
    next();
};
const userOwnsList = async (req,resp, next) =>{
   const listId = req.params.list_id;
   if(!listId){
       resp.render('errors/400', {error:'No list id provided'});
       return;
   }
    const listObj = await List.findByPk(listId);

    if(!listObj){
        resp.render('errors/404',  {error:'No list found'});
        return;
    }
    if(listObj.userId !== req.session.user.id){
        resp.render('errors/403',  {error:'You are not allowed to see this list'});
        return;
    }
    next();
};
module.exports = {
    redirectHome,
    redirectLogin,
    setSession,
    overrideMethods,
    manageFilter,
    userOwnsList
};

