var date = new Date();
var year = date.getFullYear();

document.querySelector(".copyright").innerHTML = "Copyright &copy; Tarik Jaber " + String(year);

console.log("hello");

const elements = $("h2, .bodytext p, .footer *");

var windowHeight = window.innerHeight;;

function checkPosition() {
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var positionFromTop = elements[i].getBoundingClientRect().top;

    if (positionFromTop - windowHeight <= 0) {
      element.classList.add('fade-in-element');
      element.classList.remove('hidden');
    }
  }
}

document.addEventListener('scroll', function(e) {
  checkPosition();
});

window.onload = function () {
  checkPosition();

  $(".title-column1 h1, .title-column1 h3").addClass("slide-in-left");
  $(".title-column2 img").addClass("slide-in-right");
}