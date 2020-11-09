// 10 secound countdown
const COUNTDOWN = 10

// 10 ms tick speed
const TICK = 10


// do stuff before/during launch
const OPS = {
    10: [async function(alert) {
        alert("initiating countdown")
    }],
    5: [async function(alert) {
        alert("retracting arm")
    }],
    1: [async function(alert) {
        alert("ignition!!!")
    }]
}

// reset launcher
async function reset(alert) {
    // extend arm
    alert("extending arm")

    // exit
    process.exit()
}

// return callback to check if it's still safe to launch
function safeToLaunch() {
    return function() {
        return true
    }
}

// return abort callback when called
function abortLoop(timeout, countdown, condition) {
    return function() {
        // abort if condition not met
        if(!condition()) {
            // cancel launch
            clearTimeout(timeout)

            // stop countdown
            clearInterval(countdown)

            // reset launcher
            reset()
        }
    }
}

// return rocket launcher
function rocketLauncher(countdown, alert) {
    return function() {
        // stop countdown
        clearInterval(countdown)

        // launch rocket        
        

        // post ignition sequence
        reset()

        // exit
        process.exit()
    }
}

// counter
function counter(countdown, alert) {
    let i = countdown
    return function() {
        // output i
        alert(i)

        // execute any operations
        if(operations = OPS[i]) operations.forEach(f =>
            f(alert))

        // count down
        i--
    }
}

// start countdown, specifying output method and abort condition
function scheduleLaunch({ tick, time, alert, condition }) {
    // start countdown
    let countdown = setInterval(counter(time, alert), 1000)
    
    // schedule launch + one second (for some reason it time * 1000 stops at 2)
    let timeout = setTimeout(rocketLauncher(countdown, alert), time * 1000 + 1000)
    
    // abort if something goes wrong
    setInterval(abortLoop(timeout, countdown, condition), tick)

    return timeout
}

// main function
async function main() {
    // schedule launch
    scheduleLaunch({
        // condtion check interval
        tick: TICK,
        // countdown time
        time: COUNTDOWN,
        // output method
        alert: console.log,
        // condition
        condition: safeToLaunch()
    })
}

// execute main function
main()