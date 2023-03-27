/* client.js */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Create tweet HTML element from a tweet object
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
          <a href="#" class="like-action"><i class="fas fa-heart"></i> </a>
          <a href="#" class="retweet-action"><i class="fas fa-retweet"></i> </a>
          <a href="#" class="flag-action"><i class="fas fa-flag"></i></a>
        </div>
      </footer>
    </article>
  `);

  return $tweet;
};

// function to render tweets from an array of tweet data
const renderTweets = function(tweets) {
  const $tweetsContainer = $('#tweets-container');
  
  $tweetsContainer.empty(); // clear the container first
  
  tweets.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.append($tweet);
  });
};
  

// add event listener for form submit
$('form').on('submit', function(event) {
  event.preventDefault(); // prevent default form submission behavior
  
  // serialize form data into query string
  var formData = $(this).serialize();
  
  // send POST request to server with serialized form data
  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: formData,
    success: function() {
      console.log('Tweet posted successfully');
      // refresh the tweet list to show the new tweet
      loadTweets();
    },
    error: function(error) {
      console.error('Error posting tweet:', error);
    }
  });
});

// function to load tweets from the server and display them on the page
function loadTweets() {
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
}

// load initial tweets when the page loads
$(document).ready(function() {
  loadTweets();

  // Add event listener for form submission
  $('#new-tweet-form').on('submit', function(event) {
    event.preventDefault();

    // Serialize the form data
    const serializedData = $(this).serialize();

    // Send the AJAX POST request
    $.post('/tweets', serializedData)
      .then(function(responseData) {
        console.log(responseData);
        loadTweets();
      })
      .catch(function(error) {
        console.log(error);
      });
  });
});


