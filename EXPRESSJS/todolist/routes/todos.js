const express = require('express');
const router = express.Router();
const { updateTodo, addTodo,deleteTodo, getTodoById, getTodos} = require('../controllers/todosController');
const logger = (req, res, next) =>{
   if(req.params.id>100){
       next(new Error('id cannot be > 100'));
   }
    next();
}
router.all('*', (req, resp, next) =>{
    console.log('I am the all * middleware');
    next();
});
router.get('/', (req, res)=>{
  res.json(getTodos());
});
router.get('/:id([0-9]+)',  [logger, (req, res)=>{
    const result = getTodoById(req.params.id);
    res.status(result? 200: 404).json(result? result: null);
}]);

router.delete('/:id([0-9]+)', (req, res)=>{
    const deleted = deleteTodo(req.params.id)
    res.status(deleted? 200: 404).json(deleted? deleted: null);
});

router.post('/', (req, res)=>{
    console.log(req.body)
    res.json(addTodo(req.body));
});
router.patch('/:id([0-9]+)', (req, res)=>{
    console.log(req.body, req.params.id);
    const updTodo = updateTodo(req.params.id, req.body);
    res.status(updTodo ? 200: 404).json(updTodo ? updTodo : ' Record not found');
});
module.exports = router;
