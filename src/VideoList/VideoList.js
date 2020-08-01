import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';

import './VideoList.css';

const VideoList = ({video}) => {
    return(
        <div className="videoListClass">
        {console.log(video)}
        <Grid container spacing={3} >
        {
            video.map((v, i) => {
                var id = `https://i.ytimg.com/vi/${v.id.videoId}/mqdefault.jpg`;
                return(
                    <Grid className="gridItem" item component={Card} xs={3}>
                            <CardMedia><img title="YTVideo" width="280" src={id} alt={v.snippet.title}/></CardMedia>
                            <CardContent>
                                <Typography variant="body1" color="primary" gutterBottom>{v.snippet.title}</Typography>
                                <Typography variant={"caption"}>{v.snippet.description}</Typography>
                            </CardContent>
                            <Divider orientation="vertical" flexItem />
                    </Grid>
                )
            })
        }
        </Grid>
        <br />
        <br />
        
            {/* <br />
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Card>
                        <CardMedia alt={video[1].snippet.title} image="https://www.youtube.com" />
                        <CardContent>
                            <Typography variant={"h6"} gutterBottom>{video[1].snippet.title}</Typography>
                            <Typography variant={"caption"}>{video[1].snippet.description}</Typography>
                            <Divider light />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card>
                        <CardMedia image="https://youtube.com" />
                        <CardContent>
                            <Typography variant={"h6"} gutterBottom>Video TItle</Typography>
                            <Typography variant={"caption"}>Video Description Video Description Video Description Video Description Video Description Video Description Video Description Video Description Video Description Video Description Video Description Video Description </Typography>
                            <Divider light />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card>
                        <CardMedia image="https://youtube.com" />
                        <CardContent>
                            <Typography variant={"h6"} gutterBottom>Video TItle</Typography>
                            <Typography variant={"caption"}>Video Description Video Description Video Description Video Description Video Description Video Description Video Description Video Description Video Description Video Description Video Description Video Description </Typography>
                            <Divider light />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card>
                        <CardMedia image="https://youtube.com" />
                        <CardContent>
                            <Typography variant={"h6"} gutterBottom>Video TItle</Typography>
                            <Typography variant={"caption"}>Video Description Video Description Video Description Video Description Video Description Video Description Video Description Video Description Video Description Video Description Video Description Video Description </Typography>
                            <Divider light />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
             */}
        </div>
    )
}
export default VideoList;