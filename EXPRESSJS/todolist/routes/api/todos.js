const express = require('express');
const router = express.Router();
const { updateTodo, addTodo,deleteTodo, getTodoById, getTodos} = require('../../controllers/todosController');
const logger = (req, res, next) =>{
   if(req.params.id>100){
       next(new Error('id cannot be > 100'));
   }
    next();
};
router.all('*', (req, resp, next) =>{
    console.log('I am the all * middleware');
    next();
});
router.get('/', async (req, res)=>{
    try{
        const result = await getTodos();
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }

});


router.get('/:id([0-9]+)',  [logger, async (req, res)=>{

    try {
        const result = await getTodoById(req.params.id);
         res.status(result ? 200 : 404).json(result ? result : null);
    }catch (e) {
        res.status(500).send(e.toString());
    }
}]);

router.delete('/:id([0-9]+)', async (req, res)=>{
    const deleted = await deleteTodo(req.params.id);
    res.status(deleted? 200: 404).json(deleted? deleted: null);
});


router.post('/', async (req, res)=>{
    try{
        const result = await addTodo(req.body);
        res.json(result);
    }catch (e) {
        res.status(500).send(e.toString());
    }

});
router.patch('/:id([0-9]+)', async (req, res)=>{
    try {
        const result = await updateTodo(req.params.id, req.body);
        res.status(result[0] ? 200 : 404).json(result[0] ? result[0] : null);
    }catch (e) {
        res.status(500).send(e.toString());
    }

});
module.exports = router;
