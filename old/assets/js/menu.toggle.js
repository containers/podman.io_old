var burger = document.getElementById("js-burger");
var header = document.getElementById("js-header");

burger.addEventListener("click", function () {
  header.classList.toggle("active");
  burger.classList.toggle("active");
});
