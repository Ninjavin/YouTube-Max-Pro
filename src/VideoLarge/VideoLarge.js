import React from "react";
import { CardMedia } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import { CopyToClipboard } from "react-copy-to-clipboard";

const VideoLarge = ({ playVideo }) => {
  if (!playVideo) {
    return <Skeleton variant="rect" width={800} height={450} />;
  }

  var videoSource = `https://www.youtube.com/embed/${playVideo.id.videoId}`;
  return (
    <div className="mainVideoLarge">
      <div className="videoLarge">
        <CardMedia
          component="iframe"
          title="YTVideo"
          src={videoSource}
          height="450"
        />
      </div>
      <CopyToClipboard text={videoSource}>
        <Button
          className="copyButton"
          color="primary"
          onClick={<span>Copied!</span>}
        >
          Copy Link
        </Button>
      </CopyToClipboard>
    </div>
  );
};

export default VideoLarge;
