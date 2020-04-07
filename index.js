var date = new Date();
var year = date.getFullYear();

document.querySelector(".copyright").innerHTML = "Copyright &copy; Tarik Jaber " + String(year);

console.log("hello");

const elements = $("h1, h2, h3, .bodytext p, .footer *, img");

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
}