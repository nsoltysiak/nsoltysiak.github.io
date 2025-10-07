let currentPage = window.location.href;

let navLinks = document.querySelectorAll(".links a");

for (let i = 0; i < navLinks.length; i++) {
  if (navLinks[i].href === currentPage) {
    navLinks[i].classList.add("active-page");
  }
}

// Select the dropdown element
const dropdown = document.querySelector(".dropdown");

// When mouse enters, show the dropdown
dropdown.addEventListener("mouseenter", () => {
  dropdown.classList.add("show");
});

// When mouse leaves, hide the dropdown
dropdown.addEventListener("mouseleave", () => {
  dropdown.classList.remove("show");
});
