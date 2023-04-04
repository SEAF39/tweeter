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
          <p>${escape(tweet.content.text)}</p>
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
      $tweetsContainer.append($tweet);
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
 
$(document).ready(function() {
  $('#error-message').hide();
  $('#tweet-submit').on('click', function(event) {
    event.preventDefault();
    var tweetText = $('#tweet-text').val();
    if (tweetText.trim().length === 0) {
      $('#error-message').text('Error: Tweet text cannot be empty.').slideDown();
    } else if (tweetText.length > 140) {
      $('#error-message').text('Error: Tweet text cannot be longer than 140 characters.').slideDown();
    } else {
      $('#error-message').slideUp();
      $('#tweet-form').submit();
    }
  });
});
  
loadTweets();
});
const tweetForm = document.getElementById("new-tweet-form");
const tweetContent = document.getElementById("tweet-text");
tweetForm.addEventListener('submit', (event) => {
event.preventDefault();
if (tweetContent.value.length > 140) {
const errorMessage = document.getElementById('error-message');
errorMessage.innerText = 'Tweet is too long (maximum 140 characters)';
errorMessage.style.display = 'block';
}else {
const tweetText = tweetContent.value;
}
});

/* // Define a function to escape special characters in a string
const escape = function (str) {
  // Create a new div element
  let div = document.createElement("div");
  // Append the string as a text node to the div
  div.appendChild(document.createTextNode(str));
  // Return the HTML of the div, which has special characters escaped
  return div.innerHTML;
};

// Use the escape function to create a safe HTML string containing the user's input
const safeHTML = `<p>${escape(textFromUser)}</p>`; */


