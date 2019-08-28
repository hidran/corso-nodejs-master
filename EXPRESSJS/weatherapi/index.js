const express = require('express');

const app = express();
const {getWeather} = require('./functions');
app.listen(3000);
app.use(express.static('public'));


app.get('/getWeather/:zip([0-9]+)',async (req, res) => {
    try{
       const weather =  await getWeather({zip : req.params.zip + ',IT'});
       res.json(weather);
    } catch (e) {
        res.status(500).send(e.message)
    }

});
app.get('/getWeather/:city([a-zA-Z]+)', async(req, res) => {
    try{
        const weather =  await getWeather({q : req.params.city });
        res.json(weather);
    } catch (e) {
        res.status(500).send(e.message)
    }
});


