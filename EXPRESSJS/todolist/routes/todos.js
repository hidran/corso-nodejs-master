const express = require('express');
const router = express.Router();
const {manageFilter} = require('../middlewares');
const todo = require('../controllers/todosController');
const {getListByUserId} = require('../controllers/listsController');
router.get('/', manageFilter, async (req, res)=>{

    try{
        let {q, completed}  =  req.query;

        const tmpCompleted = completed;
         if(completed === undefined){
            completed = 0;
        }
        const {id} = req.session.user;

         completed = completed ==='ALL'? undefined : completed;
        const lists = await getListByUserId(id);
        const result = await todo.getTodos({q, userId: id, completed});
        res.render('todos', {
                todos : result,
                showBackButton: false,
                user: req.session.user,
                   lists,q,
                  completed:tmpCompleted,
            showFilter : 1,
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
        let {listId, completed} = req.body;
        listId= listId ?listId : null;

        const updated = await todo.addTodo(
            {...req.body,listId }
        );
        req.flash('messages','Todo added!');
        const todoRoute = listId ? '/' + listId +'/todos' : '/todos';
        resp.redirect(todoRoute);
        // resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
    } catch (e) {
        console.log(e)
        const errors = e.errors?e.errors.map(ele => ele.message) : [e.toString()]
        req.flash('errors',  errors);
        resp.redirect('/todos');
        // resp.status(500).send(e.toString());
    }
});
module.exports = router;
