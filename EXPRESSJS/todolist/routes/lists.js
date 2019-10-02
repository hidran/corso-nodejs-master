const express = require('express');
const router = express.Router();
const list = require('../controllers/listsController');
const {getTodosByListId} = require('../controllers/todosController');

router.get('/', async (req, res)=>{

    try{
         const {q}  =  req.query;
        const result = await list.getLists({q});
        res.render('index', {
            lists : result,
            showBackButton: false,
            q,
           message: req.flash('success')
        }
            );
    } catch (e) {
        res.status(500).send(e.toString());
    }

});
router.get('/:list_id([0-9]+)/edit', async (req, res)=>{
    console.log('userid=' + req.session.userId );
    try{
        const listId = req.params.list_id;
        const listObj = await list.getListById(listId);
        const values = listObj.dataValues;

        res.render('list/edit', {...values});
    } catch (e) {
        res.status(500).send(e.toString());
    }

});
router.get('/new', async (req, res)=>{
    try{

        res.render('list/newlist',{ showBackButton: true});
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
router.delete('/:list_id([0-9]+)', async (req,resp) =>{
    try{
     const deleted = await list.deleteList(req.params.list_id);
     resp.redirect('/');
       // resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
    } catch (e) {
       // resp.status(500).send(e.toString());
    }
});
router.patch('/:list_id([0-9]+)', async (req,resp) =>{
    try{
        const updated = await list.updateList(req.params.list_id, req.body.list_name);
        resp.redirect('/');
        // resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
    } catch (e) {
         resp.status(500).send(e.toString());
    }
});
router.post('/', async (req,resp) =>{
    try{
        const updated = await list.addList( req.body.list_name);
        req.flash('success','List added!')
        resp.redirect('/');
        // resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
    } catch (e) {
        resp.redirect('/?error= ' + e.toString());
        // resp.status(500).send(e.toString());
    }
});
module.exports = router;
