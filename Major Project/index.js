let currentPage = window.location.href;

let navLinks = document.querySelectorAll(".links a");

for (let i = 0; i < navLinks.length; i++) {
  if (navLinks[i].href === currentPage) {
    navLinks[i].classList.add("active-page");
  }
}

// Select the dropdown element
const dropdown = document.querySelector(".dropdown");

function addShowClass()
{
    dropdown.classList.add("show");
}

function removeShowClass()
{
  dropdown.classList.remove("show");
}

// When mouse enters, show the dropdown
dropdown.addEventListener("mouseenter", addShowClass);

// When mouse leaves, hide the dropdown
dropdown.addEventListener("mouseleave", removeShowClass);
