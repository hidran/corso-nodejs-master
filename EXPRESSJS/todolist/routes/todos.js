const express = require('express');
const router = express.Router();
const todo = require('../controllers/todosController');
router.get('/', async (req, res)=>{

    try{
        let {q, completed}  =  req.query;
        if(completed === undefined){
            completed = 0;
        }
        const {id} = req.session.user;

        const result = await todo.getTodos({q, userId: id, completed});
        res.render('todos', {
                todos : result,
                showBackButton: false,
                user: req.session.user,
                errors: req.flash('errors'),
                messages: req.flash('messages')
            }
        );
    } catch (e) {
        res.status(500).send(e.toString());
    }

});
router.post('/', async (req,resp) =>{
    try{
        const {listId} = req.body;
        console.log(req.body);
        const updated = await todo.addTodo(
            {...req.body}
        );
        req.flash('messages','Todo added!');
        const todoRoute = listId ? '/' + listId +'/todos' : '/todos';
        resp.redirect(todoRoute);
        // resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
    } catch (e) {
        console.log(e)
        req.flash('errors',  e.errors?e.errors.map(ele => ele.message) : e.toString());
        resp.redirect('/todos');
        // resp.status(500).send(e.toString());
    }
});
module.exports = router;
