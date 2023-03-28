/* jquery.timeago.js */


// Wait for the document to be ready before running any jQuery code
$(document).ready(function() {
  // Find all elements with class "timeago" and apply the timeago function
  $('time.timeago').timeago();
  });
  
  // Get the timestamp of the tweet
  const tweetTimestamp = Date.now() - 1000 * 60 * 5; // Example: 5 minutes ago
  
  // Convert the timestamp to a human-readable format using the timeago library
  const timeAgo = $.timeago(tweetTimestamp);
  console.log(timeAgo); // Output: "5 minutes ago"
  
  // Display the time passed since the tweet
  const tweetTimeElement = document.querySelector('.tweet-time');
  tweetTimeElement.textContent = timeAgo;
  
  // Assume date is a Date object representing the time the tweet was posted
  const tweetDate = new Date(Date.now() - 1000 * 60 * 5); // Example: 5 minutes ago
  const timeAgo = $.timeago(tweetDate);
  console.log(timeAgo); // Output: "5 minutes ago"