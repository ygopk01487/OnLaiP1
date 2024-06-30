//menu
export const ScrollMenu = () => {
  window.addEventListener("scroll", () => {
    const menu = document.querySelector("#menu");
    const menuMiniUser = document.querySelector("#menuMiniUser");
    let scroll = window.scrollY;
    // console.log(scroll);
    if (scroll > 100) {
      menu.classList.add("scroll");
    } else if (scroll < 100) {
      menu.classList.remove("scroll");
    }
  });
};

//back to top
export const backToTOp = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

//back to review
export const backToReview = () => {
  window.scrollTo({ top: 400, behavior: "smooth" });
};

export const showBack = () => {
  window.addEventListener("scroll", () => {
    const back = document.querySelector("#back");
    let scroll = window.scrollY;

    if (scroll >= 300) {
      back.classList.add("show");
    } else if (scroll < 300) {
      back.classList.remove("show");
    }
  });
};
