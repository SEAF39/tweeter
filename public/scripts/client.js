/* client.js */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="left">
            <img src="${tweet.user.avatars}" alt="Profile picture">
              <h2 class="author-name">${tweet.user.name}</h2>
            </div>
          </div>
          <div class="tweet-time">
            <time datetime="${tweet.created_at}">${timeago.format(tweet.created_at)}</time>
          </div>
        </header>
          <p>
          <b>${tweet.content.text}</b>
          </p>
        <footer>
        <time class="timeago" datetime="${new Date(tweet.created_at).toISOString()}" style="text-align: left;"></time>
        <div class="right">
          <i class="flag fab fa-font-awesome-flag"></i>
          <i class="retweet fas fa-retweet"></i>
          <i class="like fas fa-heart"></i>
        </div>
      </footer>
      </article>
    `);

    return $tweet;
  };

  const renderTweets = function(tweets) {
    const $tweetsContainer = $('#tweets-container');
    $tweetsContainer.empty();
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    });
  };

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
  
  const $form = $('form');
  $form.on('submit', function(event) {
    event.preventDefault();
    const tweetText = $(this).find('textarea[name="text"]').val();
    if (!tweetText) {
      const $errorMessage = $('#error-message');
      $errorMessage.text('Error! No characters were detected in your tweet.');
      $errorMessage.slideDown();
      return;
    } else if (tweetText.length > 140) {
      const $errorMessage = $('#error-message');
      $errorMessage.text('Error! Your tweet is too long.');
      $errorMessage.slideDown();
      return;
    } else {
      const $errorMessage = $('#error-message');
      $errorMessage.text('');
      $errorMessage.slideUp();
    }
    const $this = $(this);
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $this.serialize(),
      success: function() {
        console.log('Tweet posted successfully');
        $this.find('textarea[name="text"]').val('');
        loadTweets();
      },
      error: function(error) {
        console.error('Error posting tweet:', error);
      }
    });
  });

  loadTweets();
});
