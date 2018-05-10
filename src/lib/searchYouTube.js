var searchYouTube = (options, callback) => {
  // TODO
  var url = 'https://www.googleapis.com/youtube/v3/search';
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
      
      data = data.items;
      console.log('Successfully fetched video list');
      return callback ? callback(data) : data;
    },
    error: function(data) {
      console.error('Failed to fetch video list');
    }
  });
};

window.searchYouTube = searchYouTube;
