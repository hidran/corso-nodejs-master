const fs = require('fs');
const read = fs.createReadStream(__dirname + '/data.txt');
const write = fs.createWriteStream(__dirname + '/copy-data.txt');

/*read.on('readable', ()=>{
    console.log('stream ready' + read.read());
});

 */

read.on('data', (data)=>{
    write.write(data);
});

