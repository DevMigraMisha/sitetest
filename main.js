        let colourWheel = new Winwheel({
            'numSegments'    : 10,
            'outerRadius'    : 170,
            'canvasId'       : 'colourCanvas',
            'pointerAngle'   : 90,  
            'lineWidth'   : 5,
            'textAlignment'  : 'center',
            'textMargin' : 25,
            'textFontSize' : 12,
'responsive'   : true,            // Remember to specify if not default of 0 degrees.
'segments'       :
[
{'fillStyle' : '#df002c', 'strokeStyle' : 'grey', 'textFillStyle' : "#fff", 'textFontFamily' : 'Arial',   'textFontSize' : 13, 'text' : 'Скидка \n на заказ 5%'},
{'fillStyle' : '#422527', 'strokeStyle' : 'grey', 'textFillStyle' : "#fff", 'textFontFamily' : 'Arial',   'textFontSize' : 13, 'text' : 'Скидка \nна заказ 10%'},
{'fillStyle' : '#df002c', 'strokeStyle' : 'grey', 'textFillStyle' : "#fff", 'text' : 'Скидка \nна заказ 15%'},
{'fillStyle' : '#422527', 'strokeStyle' : 'grey', 'textFillStyle' : "#fff", 'textFontFamily' : 'Arial',   'textFontSize' : 13, 'text' : 'Скидка \nна заказ 20%'},
{'fillStyle' : '#df002c', 'strokeStyle' : 'grey', 'textFillStyle' : "#fff", 'textFontFamily' : 'Arial',   'textFontSize' : 13, 'text' : 'Скидка \nна заказ 25%'},
{'fillStyle' : '#422527', 'strokeStyle' : 'grey', 'textFillStyle' : "#fff", 'textFontFamily' : 'Arial',   'textFontSize' : 13, 'text' : 'Скидка \nна заказ 30%'},
{'fillStyle' : '#df002c', 'strokeStyle' : 'grey', 'textFillStyle' : "#fff", 'textFontFamily' : 'Arial',   'textFontSize' : 13, 'text' : 'Образец \nв подарок'},
{'fillStyle' : '#422527', 'strokeStyle' : 'grey', 'textFillStyle' : "#fff", 'textFontFamily' : 'Arial',   'textFontSize' : 13, 'text' : 'Заказ до 5000₽\n за 1₽'},
{'fillStyle' : '#df002c', 'strokeStyle' : 'grey', 'textFillStyle' : "#fff", 'textFontFamily' : 'Arial',   'textFontSize' : 13, 'text' : '1+1=3'},
{'fillStyle' : '#422527', 'strokeStyle' : 'grey', 'textFillStyle' : "#fff", 'textFontFamily' : 'Arial',   'textFontSize' : 13, 'text' : 'Подарок-\nсюрприз\n к заказу'},


],
'animation' :
{
    'type'     : 'spinToStop',
    'duration' : 5,
    'spins'    : 8,

// To do something after the animation has finished specify callback function.
'callbackFinished' : textWin,
// During the animation need to call function to re-draw triangle.
'callbackAfter' : 'drawColourTriangle()'
}

});








// This function called after the spin animation has stopped.
function winAnimation(){
// Get the number of the winning segment.
// let winningSegmentNumber = colourWheel.getIndicatedSegmentNumber();

// for (let x = 1; x < colourWheel.segments.length; x ++) {
//     colourWheel.segments[x].fillStyle = 'gray';
// }
// colourWheel.segments[winningSegmentNumber].fillStyle = 'yellow';

colourWheel.draw();

drawColourTriangle();

disable();



}


drawColourTriangle();

// Draw pointer on canvas, this time on the right.
function drawColourTriangle()
{
// Get context used by the wheel.
let ctx = colourWheel.ctx;

ctx.strokeStyle = '#fff';  // Set line colour.
ctx.fillStyle   = 'black';  // Set fill colour.
ctx.lineWidth   = 10;
ctx.beginPath();           // Begin path.

ctx.moveTo(390, 174);      // Move to initial position.
ctx.lineTo(390, 226);      // Draw lines to make the shape.
ctx.lineTo(360, 200);
ctx.lineTo(390, 175);
ctx.stroke();              // Complete the path by stroking (draw lines).
ctx.fill();

}

function startSpin(){
colourWheel.stopAnimation(false);
colourWheel.rotationAngle = colourWheel.rotationAngle % 360;
colourWheel.startAnimation();
}

var timerStart = window.localStorage.getItem('timerStart')

setInterval(timer, 100);

function timer() {
    var count = 60 * 60 - Math.round((new Date().getTime() - timerStart) / 1000)
    if (count < 0) {
        clearInterval(timer);
        return;
    }

    var seconds = count % 60;
    var minutes = Math.floor(count / 60);
    minutes %= 60;

    document.getElementById("timer").innerHTML = (minutes).toLocaleString('ru-RU', {minimumIntegerDigits: 2, useGrouping:false}) + ":" + (seconds).toLocaleString('ru-RU', {minimumIntegerDigits: 2, useGrouping:false}); 
    }

function textWin(indicatedSegment){
    timerStart = new Date().getTime()
    window.localStorage.setItem('timerStart', timerStart);
    window.localStorage.setItem("prize", indicatedSegment.text);
    if(localStorage.getItem("prize")!= null){
        $('.win').text("Ваш приз:" + localStorage.getItem('prize'));
    }
    timer();
disable();
    $('#colourCanvas').addClass('active');
}

if(localStorage.getItem("prize")!= null){
    $('.win').text("Ваш приз:" + localStorage.getItem('prize'));
}

if (localStorage.getItem('tutCanvas') == 'active') {
    $('.tutCanvas').addClass('active');
}

function disable(){
    $('#colourCanvas').toggleClass('active');
    if (localStorage.getItem('tutCanvas') == 'active') {
        localStorage.removeItem("tutCanvas", "active");
    } else {
        localStorage.setItem("tutCanvas", "active");
    }

}
