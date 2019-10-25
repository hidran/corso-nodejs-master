const express = require('express');
const router = express.Router();
const list = require('../controllers/listsController');
const {getTodosByListId} = require('../controllers/todosController');
const {manageFilter, userOwnsList} = require('../middlewares');
router.get('/', async (req, res) => {

    try {
        const {q} = req.query;
        const {id} = req.session.user;
        const result = await list.getLists({q, userId: id});
        res.render('index', {
                lists: result,
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
router.get('/:list_id([0-9]+)/edit', userOwnsList, async (req, res) => {
    console.log('userid=' + req.session.userId);
    try {
        const listId = req.params.list_id;
        const listObj = await list.getListById(listId);
        const values = listObj.dataValues;
        const errors = req.flash('errors');
        res.render('list/edit', {
            ...values, errors,
            user: req.session.user
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }

});
router.get('/new', async (req, res) => {
    try {

        res.render('list/newlist', {
            showBackButton: true,
            user: req.session.user
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }

});
router.get('/:list_id([0-9]+)/todos',userOwnsList, manageFilter, async (req, res) => {
    try {
        const listId = req.params.list_id;
        let {completed, q} = req.query;
        const tmpCompleted = completed;
        if(completed === undefined){
            completed = 0;
        }
        const listObj = await list.getListById(listId);

        const result = await getTodosByListId(listId, completed);
        const user = req.session.user;
        const lists = await list.getListByUserId(user.id);

        res.render('todos', {
                todos: result, list_name: listObj.name,
                user: req.session.user,
                listId,
                  user,
                   lists,
                  q,
            completed : tmpCompleted,
            showFilter : 1

            }
        );
    } catch (e) {
        res.status(500).send(e.toString());
    }

});
router.delete('/:list_id([0-9]+)',userOwnsList, async (req, resp) => {
    try {
        const deleted = await list.deleteList(req.params.list_id);
        req.flash('messages', 'List deleted correclty!');
        resp.redirect('/');
        // resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
    } catch (e) {
        req.flash('errors', e.errors.map(ele => ele.message));
        resp.redirect('/');
    }
});
router.patch('/:list_id([0-9]+)',userOwnsList, async (req, resp) => {
    try {
        const updated = await list.updateList(req.params.list_id, req.body.list_name);
        req.flash('messages', 'List modified correctly!')
        resp.redirect('/');
        // resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
    } catch (e) {
        req.flash('errors', e.errors.map(ele => ele.message));
        resp.redirect(req.params.list_id + '/edit');
    }
});
router.post('/', async (req, resp) => {
    try {
        const updated = await list.addList(
            req.body.list_name,
            req.session.user.id
        );
        req.flash('messages', 'List added!')
        resp.redirect('/');
        // resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
    } catch (e) {
        req.flash('errors', e.errors.map(ele => ele.message));
        resp.redirect('/');
        // resp.status(500).send(e.toString());
    }
});
module.exports = router;
