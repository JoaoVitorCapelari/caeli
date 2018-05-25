# Ceara Feelings

Ceara Feelings is an IOT project to mesuare umidity and temperature of any local

## Getting Started

The project is separated in 3 peaces:

1. Arduino application '/cearaFeelings_Arduino/cearaFeelings.ino'
2. NodeJS application  '/app.js/'
3. Angular application 'angular/cearaFeelings/'

The Angular project is compiled and a 'dist' folder is generated. If you perform any change 
in the project you will need to run:

```
ng build
```

and copy the dist folder generated inside Angular project inside /root folder

### Prerequisites

You will need:

- Arduino IDE
    - Arduino UNO (x1)
    - DHT11 Sensor (x1)
    - 10k Resistor (x1)
    - Protoboard (x1)
    - Male-Male Jumpers (x3)

- NodeJS Installed (https://nodejs.org/en/)

- Angular CLI Installed (https://angular.io/guide/quickstart)

On main folder and '/angular/cearaFeelings/' run:
```
npm install
```
Go to main folder and run:
```
node app.js
```
In the console you will see the response comming from Arduino file:

Exemple:
```
U:50.00% T:22.00°C 5/22/2018 3:05:45 PM
```

You can access through your browser: 
```
https://localhost:3000/
```

## Built With

* [Angular](https://angular.io/) - The web framework used
* [Arduino](https://www.arduino.cc/) - IOT
* [NodeJS](https://nodejs.org/en/) - Server side application
* [Socket.io](https://socket.io/) - Use as a real-time engine

## Authors

* **João Vitor Carvalho** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
