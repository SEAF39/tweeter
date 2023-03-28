/* jquery.timeago.js */


// Wait for the document to be ready before running any jQuery code
$(document).ready(function() {
  $('time.timeago').timeago();

  const tweetDate = new Date(Date.now() - 1000 * 60 * 5);
  const timeAgo = $.timeago(tweetDate);

  const tweetTimeElement = document.querySelector('.tweet-time');
  tweetTimeElement.textContent = timeAgo;

  console.log(timeAgo);
});