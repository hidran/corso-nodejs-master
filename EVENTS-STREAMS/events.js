const EventEmitter = require('events');

const evt = new EventEmitter();
function writeData(data){
    console.log('writeData');
    console.log(data);
}
evt.on('onData', data =>{
    console.log('every time onData is emitted');
    console.log(data);
});
evt.once('onData', data =>{
    console.log('only once onData is emitted');
    console.log(data);
});
evt.emit('onData',[1,3,4,5]);
evt.addListener('onData',writeData);
evt.emit('onData',[6,7,8,9]);

