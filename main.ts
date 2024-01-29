let averageLightLevel: number = 0;
let allowedOffset: number = 10;
let scanCycles: number = 10;

input.onButtonPressed(Button.A, function(){
    averageLightLevel = 0;
    for (let i = 0; i < scanCycles; i++) {
        averageLightLevel += input.lightLevel();
        basic.pause(50)
    }
    averageLightLevel /= scanCycles;
})

basic.forever(function() {
    if (Math.abs(averageLightLevel - input.lightLevel()) > allowedOffset) {
        music.playTone(800, 100)
    }

    console.log(input.lightLevel());
    console.log(averageLightLevel);
    console.log(averageLightLevel - input.lightLevel());

    basic.pause(100);
})