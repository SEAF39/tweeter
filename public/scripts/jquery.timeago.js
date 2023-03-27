/* jquery.timeago.js */

// Get the timestamp of the tweet
const tweetTimestamp = Date.now() - 1000 * 60 * 5; // Example: 5 minutes ago

// Convert the timestamp to a human-readable format using the timeago library
const time-Ago = jQuery.timeago(tweetTimestamp);
console.log(time-Ago); // Output: "5 minutes ago"

// Display the time passed since the tweet
const tweetTimeElement = document.querySelector('.tweet-time');
tweetTimeElement.textContent = time-Ago;


// Assume `date` is a Date object representing the time the tweet was posted
var timeAgo = jQuery.timeago(date);
// `timeAgo` will be a string like "5 minutes ago"


const tweetDate = new Date(Date.now() - 1000 * 60 * 5); // Example: 5 minutes ago
const time-Ago = jQuery.timeago(tweetDate);
console.log(time-Ago); // Output: "5 minutes ago"
