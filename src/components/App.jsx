class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: this.props.videos,
      selectedVideo: null,
      inputString: '',
      timeoutID: null
    };
    this.searchYouTube = (searchString) => {
      let options = {
        query: searchString,
        key: YOUTUBE_API_KEY,
        max: 5
      };
      this.props.searchYouTube(options, (data) => {
        this.setState({
          videos: data,
          selectedVideo: data.length ? data[0] : null 
        });
      });
    };
  }
  
  
  
  componentDidMount() {
    
    this.searchYouTube(this.state.inputString);
  }
  
  handleVideoListEntryClick(video) {
    this.setState({
      selectedVideo: video
    });
  }
  
  handleSearchClick(searchString) {
    if (this.state.timeoutID) {
      clearTimeout(this.state.timeoutID);
    }
    this.searchYouTube(searchString);
  }
  
  handleSearchTextChange(event) {
    if (this.state.timeoutID) {
      clearTimeout(this.state.timeoutID);
    }
    this.setState({
      inputString: event.target.value,  
      timeoutID: setTimeout(this.searchYouTube.bind(this, event.target.value), 500)
    });     
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search onSearchClick={this.handleSearchClick.bind(this)} onTextChange={this.handleSearchTextChange.bind(this)} inputString={this.state.inputString} />
          </div>
        </nav>
        <div className="row">   
          <div className="col-md-7">
            <VideoPlayer video={this.state.selectedVideo} />
          </div>
          <div className="col-md-5">
            <div className = "videoListClass">
              <VideoList onVideoClick={this.handleVideoListEntryClick.bind(this)} videos={this.state.videos} />
            </div>
          </div>
        </div>
      </div>
    );
  } 
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
// <h5><em>videoList</em> view goes here</h5>
window.App = App;
