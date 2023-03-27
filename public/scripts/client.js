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

  /// Add event listener for form submission
$('form').on('submit', function(event) {
  event.preventDefault(); // prevent default form submission behavior

  // Get the tweet text from the form
  const tweetText = $(this).find('textarea[name="text"]').val();

  // Check if the tweet text is empty or exceeds the maximum character limit
  if (!tweetText) {
    // Show an error message if the tweet text is empty
    $('#error-message').text('Error! No characters were detected in your tweet.');
    return;
  } else if (tweetText.length > 140) {
    // Show an error message if the tweet text exceeds the maximum character limit
    $('#error-message').text('Error! Your tweet is too long.');
    return;
  } else {
    // Clear any existing error messages
    $('#error-message').text('');
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

  // Load initial tweets when the page loads
  loadTweets();

});





