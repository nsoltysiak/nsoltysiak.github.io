let currentPage = window.location.href;
console.log(currentPage);

let navLinks = document.querySelectorAll(".links a");

for (let i = 0; i < navLinks.length; i++) {
  if (navLinks[i].href === currentPage) {
    navLinks[i].classList.add("active-page");
  }
}
