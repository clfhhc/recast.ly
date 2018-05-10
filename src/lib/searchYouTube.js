var searchYouTube = (options, callback) => {
  // TODO
  var url = 'https://www.googleapis.com/youtube/v3/search';
  console.log(options.key);
  $.ajax({
    url: url,
    type: 'GET',
    contentType: 'application/json',
    key: options.key,
    data: {
      key: options.key,
      part: 'snippet',
      q: options.query,
      maxResults: options.max || 5,
      type: 'video',
      embeddable: 'true'
    },
    success: function(data) {
      console.log('success: ', data);
      return callback(data);
    },
    error: function(data) {
      console.error('Failed to fetch message');
    }
  });
};

window.searchYouTube = searchYouTube;
