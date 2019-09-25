const express = require('express');
const router = express.Router();
const list = require('../controllers/listsController');
const {getTodosByListId} = require('../controllers/todosController');
router.get('/', async (req, res)=>{
    try{
        const result = await list.getLists();
        res.render('index', {lists : result});
    } catch (e) {
        res.status(500).send(e.toString());
    }

});
router.get('/:list_id([0-9]+)/todos', async (req, res)=>{
    try{
        const listId = req.params.list_id;
        const listObj = await list.getListById(listId);
        console.log(list)
        const result = await getTodosByListId(listId);
        res.render('todos', {todos : result, list_name: listObj.name});
    } catch (e) {
        res.status(500).send(e.toString());
    }

});
module.exports = router;
