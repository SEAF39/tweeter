// In composer-char-counter.js
$(function() {
  const MAXCHAR = 140;

  $(".new-tweet textarea").on('input', function() {
    let counter = $(this).parent().next().children(".counter");
    counter.html(MAXCHAR - this.value.length);
    if (counter.html() < 0) {
      counter.removeClass("counterUnderLimit");
      counter.addClass("counterOverLimit");
    } else {
      counter.removeClass("counterOverLimit");
      counter.addClass("counterUnderLimit");
    }
  });
});
