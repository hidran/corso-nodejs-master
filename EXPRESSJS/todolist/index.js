const express = require('express');
const app = express();
// C R U D
app.use(express.urlencoded({extended: true}));
app.use(express.json());
const ehb = require('express-handlebars');

app.engine('.hbs', ehb({extname:'.hbs'}));
app.set('view engine','.hbs');
const todosRoutes  = require('./routes/todos');
const listsRoutes  = require('./routes/lists');

app.use('/todos', todosRoutes);
app.use('/lists',listsRoutes );
app.get('/',(req,res) =>{
    res.render('index');
});
app.listen(4000, ()=> console.log('listening on port 4000'));
