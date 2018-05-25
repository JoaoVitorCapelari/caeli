const serialPort = require('serialport');
const port       = new serialPort('COM5', { baudRate: 9600 });
const express    = require('express');
const app        = require('express')();
const http       = require('http').Server(app);
const io         = require('socket.io')(http);

//Socket.io connection passing tha data as an event 'tU'
io.on('connection', (socket) => {
    console.log('Conectado');
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
});

app.use(express.static(__dirname + '/root/dist/'));

//Arduino data and date and time information
var datetime = new Date();

    port.on('data', (data) => {
        var tempUmd     = data.toString();
        var s           = tempUmd.split(';');
        var tempUmpTime = s[0]+"%" + " " + s[1]+"°C" + " " + datetime.toLocaleDateString() + " " + datetime.toLocaleTimeString();
        
        io.emit('tU', {
            U: s[0],
            T: s[1],
            date: datetime.toLocaleDateString(),
            time: datetime.toLocaleTimeString()
        });
    console.log(tempUmpTime);
  });

  port.on('error', (err) => console.log('deu ruim: ', err));

//Setting up server
http.listen(3000, function(){
    console.log('listening on *:3000');
});