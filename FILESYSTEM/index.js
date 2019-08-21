const fs = require('fs');
const config = {
    host: 'localhost',
    port: '8000',
    protocol: 'https'
};
fs.writeFile('config.json',JSON.stringify(config), {encoding:'utf8'},
   (error) => {
      if(error){
          console.error(error);
      } else{
          console.log('File created');
      }
    }
    );

console.log('After file creation 1');

fs.writeFileSync('config2.json', JSON.stringify(config));
console.log('After file creation 2');

