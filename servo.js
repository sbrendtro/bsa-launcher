const Gpio = require('pigpio').Gpio;

const motor = new Gpio(10, {mode: Gpio.OUTPUT});

let pulseWidth = 1000;
let increment = 100;

setInterval(() => {
	for(let dc=0; dc<181; i++) {
		servoWrite(dc)
	}
	for(let dc=181; dc>0; dc--) {
		servoWrite(dc)
	}
}, 1000);
