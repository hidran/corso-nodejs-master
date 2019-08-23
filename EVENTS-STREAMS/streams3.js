const fs = require('fs');
const zlib = require('zlib');
const  gzip = zlib.createGzip();
const read = fs.createReadStream(__dirname + '/data.txt');
const write = fs.createWriteStream(__dirname + '/copy-data2.txt');
const writezip = fs.createWriteStream(__dirname + '/copy-data.gz');

read.pipe(gzip).pipe(writezip);
read.on('error', e =>{
   console.log(e.toString())
});
write.on('error', e =>{
    console.log(e.toString())
});

