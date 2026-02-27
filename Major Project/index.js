let currentPage = window.location.href;

let navLinks = document.querySelectorAll(".links a");

for (let i = 0; i < navLinks.length; i++) {
  if (navLinks[i].href === currentPage) {
    navLinks[i].classList.add("active-page");
  }
}

document.querySelectorAll("nav ul li a").forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add("nav-link-active");
  }
});

// Hamburger menu controls
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");
  const submenuToggles = document.querySelectorAll(".submenu-toggle");

//   Open/Close Main Menu
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
});

// Slide-down submenus
submenuToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
        e.preventDefault();
        const submenu = toggle.nextElementSibling;
        const arrow = toggle.querySelector(".arrow");

        // Close other open submenus
        document.querySelectorAll(".submenu").forEach((other) => {
            if (other !== submenu)
            {
                other.classList.remove("open");
            }
        });

        // Reset all arrow
        document.querySelectorAll(".arrow").forEach((otherArrow) => {
            if (otherArrow !== arrow)
            {
                otherArrow.classList.remove("rotate");
            }
        });

        submenu.classList.toggle("open");
        arrow.classList.toggle("rotate");
        });
    });
});

  // select all li elements with class "has-submenu"
  const submenuItems = document.querySelectorAll('.has-submenu');

  submenuItems.forEach((item) => {
    const submenu = item.querySelector(".submenu");
    const arrow = item.querySelector(".arrow");

    // show submenu when mouse enters either li or submenu
    const showSubMenu = () => {
      submenu.style.display = "grid"; // show submenu
      arrow.style.transform = "rotate(180deg)"; // rotate arrow
    };

    // hide submenu only when mouse leaves both li and submenu
    const hideSubmenu = (e) => {
      if (!item.contains(e.relatedTarget) && !submenu.contains(e.relatedTarget))
        {
            submenu.style.display = "none";
            arrow.style.transform = "rotate(0deg)";
        }
    };

    item.addEventListener("mouseover", showSubMenu);
    item.addEventListener("mouseout", hideSubmenu);

    submenu.addEventListener("mouseover", showSubMenu);
    submenu.addEventListener("mouseout", hideSubmenu);
  });