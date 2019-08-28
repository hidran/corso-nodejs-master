const express = require('express');
const {getData} = require("country-list");

const app = express();
const {getWeather} = require('./functions');
app.listen(3000);
app.use(express.static('public'));

app.get('/getCountries', (req,res)=>{
    res.json(getData());
});
app.get('/getWeather/:zip([0-9]+)',async (req, res) => {
    try{
        const country = req.query.country_code || 'IT';
        const lang = req.query.lang || 'it';
       const weather =  await getWeather({lang ,zip : req.params.zip + ',' + country});
       res.json(weather);
    } catch (e) {
        res.status(500).send(e.message)
    }

});
app.get('/getWeather/:city([a-zA-Z]+)', async(req, res) => {
    try{
        const lang = req.query.lang || 'it';
        const weather =  await getWeather({lang ,q : req.params.city });
        res.json(weather);
    } catch (e) {
        res.status(500).send(e.message)
    }
});


