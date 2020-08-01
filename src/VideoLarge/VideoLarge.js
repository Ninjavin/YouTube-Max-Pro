import React from 'react';
import { CardMedia } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const VideoLarge = ({playVideo}) => {

    if (!playVideo){
        return(
           <Skeleton variant="rect" width={800} height={450} />
        );
       }

    var videoSource = `https://www.youtube.com/embed/${playVideo.id.videoId}`;
    return(
        <div className="videoLarge">
            {console.log(videoSource)}
            <CardMedia component="iframe" title="YTVideo" src={videoSource} height="450" />
        </div>
    )

}

export default VideoLarge;

//SlPhMPnQ58k