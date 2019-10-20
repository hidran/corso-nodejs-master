const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
router.get('/signup', async (req, res)=>{

    res.render('login', {
            signup : true
        }
    );


});
router.get('/login', async (req, res)=>{

    res.render('login', {
            signup : false
        }
    );


});
router.post('/login', async (req, res)=>{
try{
    const {name,email, id} = await auth.login(req.body);
    const User = {name,email, id};
    req.session.user = User;
    res.status(id ? 200 : 404).json(id ? User : null);
} catch (e) {
    const errorMessages = e.message;
    res.status(500).send({message: errorMessages});
}
});
router.get('/logout', async (req, res)=>{

      req.session.destroy(() =>{
          res.redirect('/auth/login');
      });



});
router.post('/register', async (req, res)=>{
    try{
        const {name,email, id} = await auth.register(req.body);
        const User = {name,email, id};
        req.session.user = User;
         res.status(id ? 200 : 404).json(id ? User : null);
    } catch (e) {
        const errorMessages = e.errors.map(error => error.message).join('\n');
         res.status(500).send({message: errorMessages});
    }


});
module.exports = router;
