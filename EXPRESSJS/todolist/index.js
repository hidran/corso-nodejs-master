const express = require('express');
const app = express();

const flash = require('connect-flash');
const {redirectLogin, redirectHome,setSession,overrideMethods} = require('./middlewares');

// configure session



// C R U D
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(setSession());
app.use(overrideMethods());
app.use(flash());

// static files
app.use(express.static(__dirname + '/public'));
app.use('/axios',express.static(__dirname + '/node_modules/axios/dist'));
app.use('/bootstrap',express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/sweetalert2',express.static(__dirname + '/node_modules/sweetalert2/dist'));
app.use(express.static(__dirname + '/public'));
const ehb = require('express-handlebars');
const helpers = require('handlebars-helpers')();
app.engine('.hbs', ehb({
    extname:'.hbs',
    helpers
}
    ));
app.set('view engine','.hbs');


// routes management
const todosRoutes  = require('./routes/api/todos');
const listsRoutes  = require('./routes/api/lists');
const autRoutes = require('./routes/auth');

app.use('/auth',redirectHome, autRoutes);

app.use('/api/todos', redirectLogin,todosRoutes);

app.use('/api/lists',redirectLogin,listsRoutes );

app.use(['/lists','/'], redirectLogin, require('./routes/lists'));
app.use(['/todos'], redirectLogin, require('./routes/todos'));


app.listen(process.env.PORT || 4000, ()=> console.log('listening on port 4000'));
