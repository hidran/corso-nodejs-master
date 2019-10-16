const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
router.get('/signup', async (req, res)=>{

    res.render('login', {
            signup : true
        }
    );


});
router.post('/register', async (req, res)=>{
    try{
        const updated = await auth.register(req.body);

         res.status(updated ? 200 : 404).json(updated ? updated : null);
    } catch (e) {

         res.status(500).send({message:e.toString()});
    }


});
module.exports = router;
