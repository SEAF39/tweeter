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
  
