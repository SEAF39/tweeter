/* composer.js */

const topScroll = function() {
  $(document).scroll(function() {
    if ($(window).scrollTop() > 200) {
      $("div.top-up")
      .show(300)
      .on("click", function() {
        $(document).off("scroll");
        $("html, body").stop(true, false).animate({ scrollTop: "0" }, 300, () => {
          $("div.top-up").hide(300);
          $(document).scroll(topScroll);
        });
      });
    }
  });
};



 $("div.top-up").hide();