function processResponse(resp) {
    let response ='';
    resp.on('data',chunk =>{
        response += chunk;
    });
    resp.on('end', () =>{
        try{
            let output = '';
            const weatherObj = JSON.parse(response);
            const descr = weatherObj.weather[0].description;
            const minTemp = weatherObj.main.temp_min;
            const maxTemp = weatherObj.main.temp_max;
            output += 'The weather is ' + descr;
            output += '.Temperature between ' + minTemp + ' and ' + maxTemp;
            console.log(output);
        } catch (e) {
            console.log(e.message);
        }

    });
}
exports.processResponse = processResponse;
