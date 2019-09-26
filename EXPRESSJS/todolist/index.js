const express = require('express');
const app = express();
// C R U D
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
const ehb = require('express-handlebars');

app.engine('.hbs', ehb({extname:'.hbs'}));
app.set('view engine','.hbs');
const todosRoutes  = require('./routes/api/todos');
const listsRoutes  = require('./routes/api/lists');

app.use('/api/todos', todosRoutes);
app.use('/api/lists',listsRoutes );
app.use(['/lists','/'], require('./routes/lists'));

app.listen(4000, ()=> console.log('listening on port 4000'));
