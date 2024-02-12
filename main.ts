let averageLightLevel: number = 0;
let allowedOffset: number = 10;
let scanCycles: number = 10;
let timer: number = 0;
let isRunning: boolean = false;
let startTime: number = 0;
let isCalibrated: boolean = false;
radio.setGroup(68)


//light level calibration
input.onButtonPressed(Button.A, function(){
    isCalibrated = false;
    averageLightLevel = 0;
    for (let i = 0; i < scanCycles; i++) {
        averageLightLevel += input.lightLevel();
        basic.pause(50);
    }
    averageLightLevel /= scanCycles;
    isCalibrated = true
})

//timer display
input.onButtonPressed(Button.B, function(){
    basic.showNumber(timer/1000)
})

//timer
radio.onReceivedString(function(receivedString:"vybehl") {
    startTime = control.millis()
    isRunning = true
})

//beep
basic.forever(function() {
    //timer
    if (isRunning && isCalibrated) {
        timer = control.millis() - startTime
        basic.showNumber(timer / 1000)
}

    //motion detected
    if (Math.abs(averageLightLevel - input.lightLevel()) > allowedOffset && isRunning && isCalibrated) {
        isRunning = false
        radio.sendString("dobehl")
    }
    basic.pause(100);
})

