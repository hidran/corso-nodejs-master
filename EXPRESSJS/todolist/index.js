const express = require('express');
const app = express();

//app.use('/todos/:id',logger);
const todosRoutes  = require('./routes/todos');



app.use('/todos', todosRoutes);

app.listen(4000, ()=> console.log('listening on port 4000'));
