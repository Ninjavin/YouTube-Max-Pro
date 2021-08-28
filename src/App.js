import React from "react";
import axios from "axios";
import SearchBar from "./SearchBar/SearchBar.js";
import VideoLarge from "./VideoLarge/VideoLarge";
import Grid from "@material-ui/core/Grid";
import VideoList from "./VideoList/VideoList";
import Download from "./Download/Download";
import "./App.css";

const dotenv = require("dotenv").config();
const api_key = process.env.REACT_APP_API_KEY;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: [],
      firstVideo: null,
    };
  }

  componentDidMount() {
    this.handleSubmit1("Memories");
  }

  handleSubmit1 = (term) => {
    this.setState({ video: [] });
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          maxResult: 5,
          q: term,
          key: api_key,
          type: "video",
        },
      })
      .then((response) => {
        for (var i = 1; i < 5; i++) {
          var videoItem = response.data.items[i];
          this.setState({
            video: [...this.state.video, videoItem],
          });
        }
        this.setState({ firstVideo: response.data.items[0] });
      })
      .catch((err) => console.log(err));
  };

  selectedVideo = (v) => {
    this.setState({
      firstVideo: v,
    });
  };

  render() {
    return (
      <div className="appDiv">
        <br />
        <SearchBar handleSubmit1={this.handleSubmit1} />
        <br />
        <br />
        <Grid container spacing={5}>
          <Grid item xs={8}>
            <VideoLarge playVideo={this.state.firstVideo} />
          </Grid>
          <Grid item xs={4}>
            <Download />
          </Grid>
        </Grid>
        <br />
        <br />
        <VideoList
          video={this.state.video}
          selectedVideo={this.selectedVideo}
        />
      </div>
    );
  }
}

export default App;
