const fs = require('fs');
fs.readdir('.','utf8', (error, arrFiles)=>{
    if(error){
        console.error(error);
        return;
    }
    for(let f of arrFiles){
        if(f === 'config.json'){
            fs.readFile(f, 'utf8', (error, data) => {
                if(error){
                    console.error('Error reading file ' + f);
                    return;
                }
                const config= JSON.parse(data);
               console.log( config.host);
                console.log(data);
              // console.log(data.toString());
            });
        }
    }
});
// do not use, it is deprecated
fs.exists('config.json', result =>{
     console.log(result ? 'File does exist' : 'File does not exist');
});

fs.stat('config.json', (error,result) =>{
    if(error){
        console.error('Error reading file ' + f);
        return;
    }
   console.log(result)
});

