const fs = require('fs');
const read = fs.createReadStream(__dirname + '/data.txt');
const write = fs.createWriteStream(__dirname + 'data/copy-data.txt');

/*read.on('readable', ()=>{
    console.log('stream ready' + read.read());
});

 */

read.on('data', (data)=>{
    write.write(data);
});
read.on('error', e =>{
   console.log(e.toString())
});
write.on('error', e =>{
    console.log(e.toString())
});

