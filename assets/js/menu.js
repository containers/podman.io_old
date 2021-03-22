(function () {
  function init() {
    const hamburguerBtn = document.querySelector(".js-nav-hamburguer-button");
    hamburguerBtn.addEventListener("click", handleHamburguerClick);

    for (const elem of document.querySelectorAll(".js-nav-links-item")) {
      elem
        .querySelector(".js-nav-link")
        .addEventListener("click", handleItemClick);
      elem.addEventListener("mouseenter", handleItemEnter);
      elem.addEventListener("mouseout", handleItemOut);
    }
  }

  function handleItemClick(event) {
    const elem = event.currentTarget;
    const menu = elem.parentNode.querySelector(".js-nav-links-sublist");

    if (menu) {
      event.preventDefault();
      menu.style.display = isVisible(menu) ? "none" : "block";
    }
  }

  function handleItemEnter(event) {
    if (!isDesktop()) return;

    const elem = event.currentTarget;
    const menu = elem.querySelector(".js-nav-links-sublist");
    if (menu) {
      menu.style.display = "block";
    }
  }

  function handleItemOut(event) {
    if (!isDesktop()) return;

    const elem = event.currentTarget;
    const menu = elem.querySelector(".js-nav-links-sublist");
    if (menu && !elem.contains(event.relatedTarget)) {
      menu.style.display = "none";
    }
  }

  function handleHamburguerClick(event) {
    event.preventDefault();
    const elem = document.querySelector(".js-nav-mobile-menu");
    elem.style.display = isVisible(elem) ? "none" : "block";
  }

  function isVisible(elem) {
    return elem.offsetParent;
  }

  function isDesktop() {
    return !isVisible(document.querySelector(".nav-hamburguer-button"));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
