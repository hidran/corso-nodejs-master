const express = require('express');
const router = express.Router();
const { updateList, addList,deleteList, getListById, getLists} = require('../controllers/listsController');


router.get('/', (req, res)=>{
    res.json(getLists());
});
router.get('/:id([0-9]+)',  (req, res)=>{
    const result = getListById(req.params.id);
    res.status(result? 200: 404).json(result? result: null);
});

router.delete('/:id([0-9]+)', (req, res)=>{
    const deleted = deleteList(req.params.id)
    res.status(deleted? 200: 404).json(deleted? deleted: null);
});

router.post('/', (req, res)=>{
    console.log(req.body)
    res.json(addList(req.body.name));
});
router.patch('/:id([0-9]+)', (req, res)=>{
    console.log(req.body, req.params.id);
    const updList = updateList(req.params.id, req.body.name);
    console.log(updList);
    res.status(updList ? 200: 404).json(updList ? updList : ' Record not found');
});
module.exports = router;
