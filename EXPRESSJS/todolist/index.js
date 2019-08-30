const express = require('express');
const app = express();
// C R U D
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//app.use('/todos/:id',logger);
const todosRoutes  = require('./routes/todos');
const listsRoutes  = require('./routes/lists');

app.use('/todos', todosRoutes);
app.use('/lists',listsRoutes );

app.listen(4000, ()=> console.log('listening on port 4000'));
