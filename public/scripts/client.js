/* client.js */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Create tweet HTML element from a tweet object
/* client.js */

$(document).ready(function() {

  // Function to create a tweet HTML element from a tweet object
  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="tweet-author">
            <img src="${tweet.user.avatars}" alt="Profile picture">
            <div class="tweet-info">
              <h2 class="author-name">${tweet.user.name}</h2>
              <p class="author-handle">${tweet.user.handle}</p>
            </div>
          </div>
          <div class="tweet-time">
            <time datetime="${tweet.created_at}">${timeago.format(tweet.created_at)}</time>
          </div>
        </header>
        <div class="tweet-content">
          <p>${escape(tweet.content.text)}</p>
        </div>
        <footer>
          <div class="tweet-actions">
            <a href="#" class="like-action"><i class="fas fa-heart"></i></a>
            <a href="#" class="retweet-action"><i class="fas fa-retweet"></i></a>
            <a href="#" class="flag-action"><i class="fas fa-flag"></i></a>
          </div>
        </footer>
      </article>
    `);

    return $tweet;
  };

  // Function to render tweets from an array of tweet data
  const renderTweets = function(tweets) {
    const $tweetsContainer = $('#tweets-container');
    $tweetsContainer.empty(); // clear the container first
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.append($tweet);
    });
  };

  // Function to load tweets from the server and display them on the page
  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: function(response) {
        console.log('GET request successful:', response);
        renderTweets(response);
      },
      error: function(error) {
        console.log('GET request failed:', error);
      }
    });
  };

 // Add event listener for form submission
$('form').on('submit', function(event) {
  event.preventDefault(); // prevent default form submission behavior

  // Get the tweet text from the form
  const tweetText = $(this).find('textarea[name="text"]').val();

  // Check if the tweet text is empty or exceeds the maximum character limit
  if (!tweetText) {
    // Show an error message if the tweet text is empty
    const $errorMessage = $('#error-message');
    $errorMessage.text('Error! No characters were detected in your tweet.');
    $errorMessage.slideDown();
    return;
  } else if (tweetText.length > 140) {
    // Show an error message if the tweet text exceeds the maximum character limit
    const $errorMessage = $('#error-message');
    $errorMessage.text('Error! Your tweet is too long.');
    $errorMessage.slideDown();
    return;
  } else {
    // Clear any existing error messages and hide the error element
    const $errorMessage = $('#error-message');
    $errorMessage.text('');
    $errorMessage.slideUp();
  }

  // Send POST request to server with serialized form data
  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: $(this).serialize(),
    success: function() {
      console.log('Tweet posted successfully');
      // Clear the tweet text after successful submission
      $(this).find('textarea[name="text"]').val('');
      // Refresh the tweet list to show the new tweet
      loadTweets();
    },
    error: function(error) {
      console.error('Error posting tweet:', error);
    }
  });
});


$(document).ready(function() {
  // Hide the error message element on page load
  $('#error-message').hide();

  // Add a click event listener to the tweet-submit button
  $('#tweet-submit').on('click', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the tweet text
    var tweetText = $('#tweet-text').val();

    // Validate the tweet text
    if (tweetText.trim().length === 0) {
      // If the tweet text is empty, show the error message element with an appropriate error message
      $('#error-message').text('Error: Tweet text cannot be empty.').slideDown();
    } else if (tweetText.length > 140) {
      // If the tweet text is longer than 140 characters, show the error message element with an appropriate error message
      $('#error-message').text('Error: Tweet text cannot be longer than 140 characters.').slideDown();
    } else {
      // If the tweet text is valid, hide the error message element and submit the form
      $('#error-message').slideUp();
      $('#tweet-form').submit();
    }
  });
});


  // Load initial tweets when the page loads
  loadTweets();

});

