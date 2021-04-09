document.addEventListener("DOMContentLoaded", function () {
  
  //menu hamburger
  $(".hamburger-btn").click(function () {
    $(this).toggleClass("active");
    $(".MainMenu").toggleClass("open");
    $("body").toggleClass("locked");
  });
  // $(".MainMenu").click(function () {
  //   $(this).removeClass("active");
  //   $(".hamburger-btn").removeClass("active");
  //   $(".MainMenu").removeClass("open");
  //   $("body").removeClass("locked");
  // });
  // ------------------------------
  // Скрипт для присвоения пункту меню класса актив при скролле
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    $(document).off("scroll");

    var target = this.hash;
    $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 500, 'swing', function () {
      window.location.hash = target;
      $(document).on("scroll", onScroll);
    });
  });
  // ------------------------------
})