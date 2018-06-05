const serialPort = require('serialport');
const port       = new serialPort('COM5', { baudRate: 9600 });
const express    = require('express');
const app        = require('express')();
const http       = require('http').Server(app);
const io         = require('socket.io')(http);
const mongoose   = require('mongoose');
var dhtSchema    = require('./models/dht');

    //connection with MongoDB
    mongoose.connect('mongodb://localhost/my_database_caeli');

    //Socket.io connection passing tha data as an event 'tU'
    io.on('connection', (socket) => {
        console.log('Conectado');
    });

    //To run Angular builded project accessing localhost:3000
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        next();
    });


    app.use(express.static(__dirname + '/root/dist/'));

    //data comming from Arduino and using socket.io 
    port.on('data', (data) => {
        var datetime    = new Date();
        var tempUmd     = data.toString();
        var s           = tempUmd.split(';');
        var tempUmpTime = s[0]+"%" + " " + s[1]+"°C" + " " + datetime.toLocaleDateString() + " " + datetime.toLocaleTimeString();

        var dados = {
            H: s[0],
            T: s[1],
            date: datetime.toLocaleDateString(),
            time: datetime.toLocaleTimeString(),
        };

        io.emit('tU', 
            dados
        );

        var Dht = mongoose.model("Dht")
        var myData = new Dht (dados);
            myData.save().then(item => {
            console.log("item saved to database");
            })
            .catch(err => {
            console.log("unable to save to database");
            });


    console.log(tempUmpTime);
  });

  port.on('error', (err) => console.log('deu ruim: ', err));

//Setting up server
http.listen(3000, function(){
    console.log('listening on *:3000');
});

