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
        const errorMessages = e.errors.map(error => error.message).join('\n');
         res.status(500).send({message: errorMessages});
    }


});
module.exports = router;
