const Gpio = require('pigpio').Gpio;

const OFFSE_DUTY = 0.5; //        #define pulse offset of servo
const SERVO_MIN_DUTY = 2.5+OFFSE_DUTY; //     #define pulse duty cycle for minimum angle of servo
const SERVO_MAX_DUTY = 12.5+OFFSE_DUTY; //    #define pulse duty cycle for maximum angle of servo
//let servoPin = 12;
let servoPin = 18;
let p

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

//   # map a value from one range to another range
function map( value, fromLow, fromHigh, toLow, toHigh) {
    return (toHigh-toLow)*(value-fromLow) / (fromHigh-fromLow) + toLow;
}

function setup() {
    p = new Gpio(servoPin, {mode: Gpio.OUTPUT});
    p.digitalWrite(0)
    p.pwmFrequency(50)
    p.servoWrite(0) // Set initial Duty Cycle to 0
}

// TODO: Left off here....
function servoWrite(angle) {      // make the servo rotate to specific angle, 0-180 
    if(angle<0){
        angle = 0
    }
    else if(angle > 180){
        angle = 180
    }
    let min = 500;
    let max = 2500;
    // let width = map(angle,0,180,SERVO_MIN_DUTY,SERVO_MAX_DUTY);
    let width = Math.floor( min + ( ( (max-min) / 180) * angle ) );
    console.log( 'Angle: ' + angle + "\tPulse Width: " + width );
    p.servoWrite(width) // map the angle to duty cycle and output it   
}

async function loop() {
    while(1) {
        for(let i=0; i<181; i++) {
            servoWrite(i)
            await sleep(5)
        }
        for(let i=180; i>-1; i--) {
            servoWrite(i)
            await sleep(5)
        }
    }
    while(1) {
    }
}

setup()
loop()
