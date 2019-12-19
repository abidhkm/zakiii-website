// navbar show/hide on scroll
let navbarMenuSticky: Element | null;
let showNavbarMenuSticky = false;
let navbarHeight = 0;
window.onscroll = () => {
  if (!navbarMenuSticky) {
    navbarMenuSticky = document.querySelector(".navbarMenu.sticky");
    if (!navbarMenuSticky) { return; }
    navbarHeight = (document.querySelector(".navbar") as Element).clientHeight;
  }
  const pos = document.documentElement.scrollTop;
  if (pos > navbarHeight && !showNavbarMenuSticky) {
    showNavbarMenuSticky = true;
    navbarMenuSticky.classList.add("show");
    document.body.classList.add("sticky");
  } else if (pos <= navbarHeight && showNavbarMenuSticky) {
    showNavbarMenuSticky = false;
    navbarMenuSticky.classList.remove("show");
    document.body.classList.remove("sticky");
  }
};
