const express = require('express');
const router = express.Router();
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
  res.send('todos');
});
router.get('/:id([0-9]+)',  [logger, (req, res)=>{
    res.send('todo with id ' + req.params.id);
}]);
module.exports = router;
