//////////////////////// DATE FOR FOOTER ////////////////////////////
var date = new Date();
var year = date.getFullYear();
document.querySelector(".copyright").innerHTML = "Copyright &copy; Tarik Jaber " + String(year);

//////////////////////// ANIME JS ////////////////////////////
let titleAnimation = anime({
  targets: 'h1',
  // Properties 
  translateX: '100%',
  // Property Parameters
  duration: 2000,
});

let subtitleAnimation = anime({
  targets: 'h3',
  // Properties 
  translateX: '100%',
  // Property Parameters
  duration: 2000,
  delay: 100,
});

let titleImageAnimation = anime({
  targets: '.title-col2 img',
  // Properties 
  translateX: '-100%',
  scaleX: [
    {
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
const txt = 'a programmer.'; 
const typeDelay = 120; 
const oldTxt = $('h3').text();
console.log(oldTxt);

function subtitleTyping() {
  if (i < txt.length) {
    $('h3').text(document.querySelector('h3').innerHTML.replace(oldTxt.charAt(i), txt.charAt(i)));
    i++;
    setTimeout(subtitleTyping, typeDelay);
  }
}

setTimeout(subtitleTyping, 2000);

//////////////////////// BODY TEXT FADE IN ////////////////////////////

$("h2, .bodytext p").addClass("hidden");
const animatedElements = $("h2, .bodytext p");

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

document.addEventListener('scroll', function(e) {
  checkPosition();
});

window.onload = function () {
  checkPosition();
}