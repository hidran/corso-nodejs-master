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

module.exports = router;
