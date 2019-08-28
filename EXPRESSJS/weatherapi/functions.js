const {WEATHER_API} = require('./constants');
 const axios = require('axios');

const getWeather = async params => {
    try {
        const result = await axios.get(WEATHER_API, {params});
        return result.data;
    } catch (e) {
        console.log(e);
        throw e.response.data;
     }

};
module.exports = {
    getWeather
};
