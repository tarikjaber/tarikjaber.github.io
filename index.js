var date = new Date();
var year = date.getFullYear();

document.querySelector(".copyright").innerHTML = "Copyright &copy; Tarik Jaber " + String(year);

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

  //Sliding the title columns into the window
  $(".title-col1").addClass("slide-in-left").removeClass("left-skewed");
  $(".title-col2").addClass("slide-in-right").removeClass("right-skewed");
}