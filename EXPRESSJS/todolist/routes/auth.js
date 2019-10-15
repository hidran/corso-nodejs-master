const express = require('express');
const router = express.Router();

router.get('/signup', async (req, res)=>{


        res.render('login', {
                signup : true
            }
        );


});
module.exports = router;
