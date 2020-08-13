const express = require('express');
const cors = require('cors');
const app = express();
const ytdl = require('ytdl-core');

app.use(cors());

const port = process.env.PORT || 5000;

app.get('/downloadVideo', (req, res) => {
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
    // console.log(videoLink, qualityLabel)
    res.header('Content-Disposition', 'attachment')
    res.header('Content-Type', 'video/mp4')
    ytdl(videoLink, {quality: quality}).pipe(res)
})

app.get('/downloadAudio', (req, res) => {
    let { audioLink } = req.query
    res.header('Content-Disposition', 'attachment')
    res.header('Content-Type', 'audio/mpeg')
    ytdl(audioLink, {filter: 'audioonly'}).pipe(res)
})

app.listen(port, () => {
    console.log(`Running on port: ${port}`);
});