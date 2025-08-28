var currentPage = window.location.href;

var navLinks = document.querySelectorAll(".links a");

for (var i = 0; i < navLinks.length; i++) {
  if (navLinks[i].href === currentPage) {
    navLinks[i].classList.add("active-page");
  }
}
