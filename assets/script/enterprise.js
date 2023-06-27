$(document).ready(function () {
  var largeur = window.innerWidth;

  console.log(largeur);

  if (largeur > 1023) {
    var curPage = 1;
    var numOfPages = $(".skw-page").length;
    var animTime = 1000;
    var scrolling = false;
    var pgPrefix = ".skw-page-";

    function pagination() {
      scrolling = true;

      $(pgPrefix + curPage)
        .removeClass("inactive")
        .addClass("active");
      $(pgPrefix + (curPage - 1)).addClass("inactive");
      $(pgPrefix + (curPage + 1)).removeClass("active");

      setTimeout(function () {
        scrolling = false;
      }, animTime);
    }

    function navigateUp() {
      if (curPage === 1) return;
      curPage--;
      pagination();
    }

    function navigateDown() {
      if (curPage === numOfPages) return;
      curPage++;
      pagination();
    }

    $(document).on("mousewheel DOMMouseScroll", function (e) {
      if (scrolling) return;
      if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
        navigateUp();
      } else {
        navigateDown();
      }
    });

    $(document).on("keydown", function (e) {
      if (scrolling) return;
      if (e.which === 38) {
        navigateUp();
      } else if (e.which === 40) {
        navigateDown();
      }
    });
  } else {
    let pagesStatus = $(".skw-page");
    console.log(pagesStatus);
    for (let i = 0; i < pagesStatus.length; i++) {
      console.log(pagesStatus[i]);
      pagesStatus.removeClass("active");
    }
  }

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.checked = false;
    });
  });
});
