const express = require('express');
const cors = require('cors');
const app = express();
const ytdl = require('ytdl-core');

app.use(cors());

const port = process.env.PORT || 5000;

app.get('/downloadVideo', async (req, res) => {
    // console.log(req.query);
    let videoLink  = req.query.videoLink;
    let qualityLabel = req.query.qualityLabel;
    let quality;
    if(qualityLabel === "144p"){
        quality = 160;
    }else if(qualityLabel === "240p"){
        quality = 133;
    }else if(qualityLabel === "360p"){
        quality = 134;
    }else if(qualityLabel === "480p"){
        quality = 135;
    }else if(qualityLabel === "720p"){
        quality = 136;
    }else
        quality = 137;
    console.log(qualityLabel)

// console.log(quality);
    res.header('Content-Disposition', 'attachment')
    res.header('Content-Type', 'video/mp4')

let videoID = ytdl.getURLVideoID(videoLink);
let info = await ytdl.getInfo(videoID);
// console.log(info);

let videoName = info.player_response.videoDetails.title;
console.log(videoName);
let format = ytdl.chooseFormat(info.formats, { quality: quality });
console.log(format);


    ytdl(videoLink, {format: format}).pipe(res)
})

app.get('/downloadAudio', (req, res) => {
    let { audioLink } = req.query
console.log(audioLink);
    res.header('Content-Disposition', 'attachment')
    res.header('Content-Type', 'audio/mpeg')
    ytdl(audioLink, {filter: 'audioonly'}).pipe(res)
})

app.listen(port, () => {
    console.log(`Running on port: ${port}`);
});
