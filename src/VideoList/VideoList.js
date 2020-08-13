import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './VideoList.css';

const VideoList = ({video, selectedVideo}) => {
    return(
        <div className="videoListClass">
        {console.log(video)}
        <Grid container spacing={3} >
        {
            video.map((v, i) => {
                var id = `https://i.ytimg.com/vi/${v.id.videoId}/mqdefault.jpg`;
                var videoSource = `https://www.youtube.com/watch?v=${v.id.videoId}`
                return(
                    <Grid className="gridItem" item component={Card} xs={3}>
                            <CardMedia><img onClick={() => selectedVideo(v)} style={{cursor:'pointer'}} title="YTVideo" width="280" src={id} alt={v.snippet.title}/></CardMedia>
                            <CardContent>
                                <Typography variant="body1" color="primary" gutterBottom>{v.snippet.title}</Typography>
                                <Typography variant={"caption"}>{v.snippet.description}</Typography>
                            </CardContent>
                            <Divider orientation="vertical" flexItem />
                            <CopyToClipboard text={videoSource} >
                                <Button className="copyButton" color="primary" onClick={console.log("Clicked")}>Copy Link</Button>
                            </CopyToClipboard>
                    </Grid>
                )
            })
        }
        </Grid>
        <br />
        <br />
        
        </div>
    )
}
export default VideoList;