var date = new Date();
var year = date.getFullYear();

document.querySelector(".copyright").innerHTML = "Copyright &copy; Tarik Jaber " + String(year);

$("h2, .bodytext p").addClass("hidden");
const elements = $("h2, .bodytext p");

var windowHeight = window.innerHeight;
var topFactor;

function checkPosition() {
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var positionFromTop = elements[i].getBoundingClientRect().top;

    if (elements[i].parentNode.tagName === "FOOTER" || elements[i].parentNode.parentNode.tagName === "FOOTER") {
      topFactor = 1.0;
    } else {
      topFactor = 0.80;
    }

    if (positionFromTop - topFactor * windowHeight <= 0) {
      element.classList.add('fade-twist-element');
      element.classList.remove('hidden');
    }
    
  }
}

document.addEventListener('scroll', function(e) {
  checkPosition();
});

window.onload = function () {
  checkPosition();

  $(".title-column1").addClass("slide-in-left").removeClass("left-skewed");
  $(".title-column2").addClass("slide-in-right").removeClass("right-skewed");
}