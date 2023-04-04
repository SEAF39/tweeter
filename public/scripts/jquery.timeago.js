/* jquery.timeago.js */

$(document).ready(function() {
  $('time.timeago').timeago();

  const tweetDate = new Date(Date.now() - 1000 * 60 * 5);
  const timeAgo = $.timeago(tweetDate);

  const tweetTimeElement = document.querySelector('.tweet-time');
  tweetTimeElement.textContent = timeAgo;

  console.log(timeAgo);
});