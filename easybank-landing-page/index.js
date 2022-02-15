const hamburgerButton = document.querySelector(".primary-nav__hamburger-btn");
const hamburgerIcon = document.querySelector(".primary-nav__hamburger-icon");
const navMenuContainer = document.querySelector(".primary-nav__list-container");
const navFocusableElements = document.querySelectorAll(
  ".primary-nav__hamburger-btn, .primary-nav__link"
);

const firstFocusableElement = navFocusableElements[0];
const lastFocusableElement =
  navFocusableElements[navFocusableElements.length - 1];

function trapNavMenuFocus(e) {
  if (e.key !== "Tab") return;
  if (e.shiftKey) {
    if (document.activeElement === firstFocusableElement) {
      e.preventDefault();
      lastFocusableElement.focus();
    }
  } else {
    if (document.activeElement === lastFocusableElement) {
      e.preventDefault();
      firstFocusableElement.focus();
    }
  }
}

function toggleHamburgerButton(menuExpanded) {
  const iconImagePath = `./images/icon-${
    menuExpanded === "true" ? "hamburger" : "close"
  }.svg`;
  hamburgerIcon.setAttribute("src", iconImagePath);
  hamburgerButton.setAttribute(
    "aria-expanded",
    menuExpanded === "true" ? "false" : "true"
  );
}

function toggleNavigationMenu() {
  navMenuContainer.classList.toggle("hidden");
}

function toggleHamburgerButtonAndMenu() {
  const ariaExpanded = hamburgerButton.getAttribute("aria-expanded");
  toggleHamburgerButton(ariaExpanded);
  toggleNavigationMenu();
}

function handleEscapeKeypress(e) {
  if (e.key !== "Escape") return;
  toggleHamburgerButtonAndMenu();
}

hamburgerButton.addEventListener("click", toggleHamburgerButtonAndMenu);
document.addEventListener("keydown", function (e) {
  const menuIsOpen = hamburgerButton.getAttribute("aria-expanded") === "true";
  if (menuIsOpen) {
    handleEscapeKeypress(e);
    trapNavMenuFocus(e);
  }
});
