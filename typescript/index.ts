//////////////////////// DATE FOR FOOTER ////////////////////////////
let date = new Date();
let year = date.getFullYear();
document.querySelector(".copyright").innerHTML = "Copyright &copy; Tarik Jaber " + String(year);

//////////////////////// ANIME JS ////////////////////////////

let titleAnimation = anime({
    targets: 'h1',
    // Properties 
    translateX: ['-100%', '0%'],
    // Property Parameters
    duration: 2000,
});

let subtitleAnimation = anime({
    targets: 'h3',
    // Properties 
    translateX: ['-100%', '0%'],
    // Property Parameters
    duration: 2000,
    delay: 100,
});

let titleImageAnimation = anime({
    targets: '.title-col2',
    // Properties 
    translateX: ['100%', '0%'],
    scaleX: [{
        value: 0.8,
        delay: 250,
        duration: 375
    },
    {
        value: 1.0,
        duration: 375
    }
    ],
    // Property Parameters
    duration: 2000,
});

////////////////////////// SUBTITLE TYPING ANIMATION ///////////////////////////

let i = 0;
const txt = 'a big chungus.';
const typeDelay = 120;
const oldTxt = document.getElementsByTagName('h3')[0].innerText;
console.log(oldTxt);

function subtitleTyping() {
    if (i < txt.length) {
        let header = document.getElementsByTagName('h3')[0];
        header.innerText = header.innerText.substring(0, i);
        i++;
        setTimeout(subtitleTyping, typeDelay);
    }
}

setTimeout(subtitleTyping, 2000);

//////////////////////// BODY TEXT FADE IN ////////////////////////////

const animatedElements = [];

document.querySelectorAll('h2, .bodytext p').forEach(element =>{
    animatedElements.push(element);
    element.classList.add('hidden')
})

var windowHeight = window.innerHeight;

function checkPosition() {
    for (var i = 0; i < animatedElements.length; i++) {
        var element = animatedElements[i];
        var positionFromTop = animatedElements[i].getBoundingClientRect().top;

        //Making the elements appear when they are 80% away from the top of the viewport
        if (positionFromTop - 0.80 * windowHeight <= 0) {
            element.classList.add('fade-in');
            element.classList.remove('hidden');
        }

    }
}

document.addEventListener('scroll', function (e) {
    checkPosition();
});

window.onload = function () {
    checkPosition();
}

/////////////////// SCROLL FUNCTION //////////////////

var oldTime = Date.now();

document.addEventListener('scroll', e => {
    if (Date.now() - oldTime > 100) {
        
        var s = window.scrollY,
            d = document.body.clientHeight,
            c = window.innerHeight;

        var scrollPercent = (s / (d - c));

        var rotatingTextAnimation = anime({
            targets: '.rotatingText',
            rotate: -0.600 * (scrollPercent + 0.78) + "turn",
            // Property Parameters

            duration: 4000,
        })

        oldTime = Date.now();
    }
})