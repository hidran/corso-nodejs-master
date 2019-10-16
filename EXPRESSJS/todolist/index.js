const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
// configure session
const MAX_AGE = process.env.MAX_AGE ||  60*60*1000;
const SECRET = process.env.SECRET ||  'Our beautiful secret';
DEFAULT_ENV = process.env.DEFAULT_ENV || 'development';
app.use(session({
    cookie: {
        maxAge:MAX_AGE,
        secure : DEFAULT_ENV === 'production'
    },

    secret :SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());
app.use((req, resp, next)=>{
    //req.session.userId = 1;
    next();
});
// C R U D
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// static files
app.use(express.static(__dirname + '/public'));
app.use('/axios',express.static(__dirname + '/node_modules/axios/dist'));
app.use('/bootstrap',express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/sweetalert2',express.static(__dirname + '/node_modules/sweetalert2/dist'));
app.use(express.static(__dirname + '/public'));
const ehb = require('express-handlebars');
const methodOverride = require('method-override');
app.engine('.hbs', ehb({extname:'.hbs'}));
app.set('view engine','.hbs');
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}));

// routes management
const todosRoutes  = require('./routes/api/todos');
const listsRoutes  = require('./routes/api/lists');
const autRoutes = require('./routes/auth');
app.use('/api/todos', todosRoutes);
app.use('/api/lists',listsRoutes );
app.use('/auth', autRoutes);
app.use(['/lists','/'], require('./routes/lists'));

app.listen(4000, ()=> console.log('listening on port 4000'));
