const searchIcon = document.querySelector("#search img"),
  searchField = document.querySelector("#search > input"),
  sidebarCloseIcon = document.querySelector("#sidebarCloseIcon"),
  lowerMenu = document.querySelector("#lowerMenu"),
  leftSidebar = document.querySelector("#leftSidebar"),
  upperMenu = document.querySelector("#upperMenu"),
  sidebarOverlay = document.querySelector("#sidebarOverlay"),
  mobileMenuItems = document.querySelectorAll("#leftLowerMenu > li.dropdown"),
  mobileMenuDropdowns = document.querySelectorAll(
    "#leftLowerMenu ul.dropdownContent"
  ),
  posts = document.querySelectorAll("#posts .post"),
  hamburger = document.querySelector("#hamburger");

let prevScrollPos = window.pageYOffset,
  oldScrollPos,
  oldScrollPosWasUp;

const closeAllDropdowns = () => {
  mobileMenuDropdowns.forEach((dropdown) => {
    dropdown.removeAttribute("style");
  });
};

searchIcon.addEventListener("click", () =>
  searchField.classList.toggle("closed")
);

hamburger.addEventListener("click", () =>
  leftSidebar.classList.remove("closed")
);

sidebarCloseIcon.addEventListener("click", () =>
  leftSidebar.classList.add("closed")
);

sidebarOverlay.addEventListener("click", () =>
  leftSidebar.classList.add("closed")
);

searchField.addEventListener("input", (e) => {
  const searchKeyword = e.target.value;
  posts.forEach((post) => {
    post.innerText.toLowerCase().includes(searchKeyword.toLowerCase())
      ? post.classList.remove("hide")
      : post.classList.add("hide");
  });
});

mobileMenuItems.forEach((menuItem) =>
  menuItem.addEventListener("click", () => {
    const isOpen = menuItem
      .querySelector("ul.dropdownContent")
      .hasAttribute("style");
    closeAllDropdowns();
    if (!isOpen) {
      menuItem.querySelector("ul.dropdownContent").style.height = `${
        menuItem.querySelector("ul.dropdownContent").childElementCount * 2
      }rem`;
    }
  })
);

window.addEventListener("scroll", () => {
  const currentScrollPos = window.pageYOffset;
  const scrollUp = oldScrollPos > this.scrollY;

  if (scrollUp) {
    if (oldScrollPosWasUp) {
      if (prevScrollPos - currentScrollPos > 200) {
        if (lowerMenu.classList.contains("hide")) {
          lowerMenu.classList.remove("hide");
        }
        if (upperMenu.classList.contains("hide")) {
          upperMenu.classList.remove("hide");
        }
      }
    } else {
      prevScrollPos = currentScrollPos;
    }
    oldScrollPosWasUp = true;
  } else {
    if (!oldScrollPosWasUp) {
      if (currentScrollPos - prevScrollPos > 200) {
        if (!lowerMenu.classList.contains("hide")) {
          lowerMenu.classList.add("hide");
        }
        if (!upperMenu.classList.contains("hide")) {
          upperMenu.classList.add("hide");
        }
      }
    } else {
      prevScrollPos = currentScrollPos;
    }
    oldScrollPosWasUp = false;
  }
  oldScrollPos = this.scrollY;
});
