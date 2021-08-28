const express = require("express");
const cors = require("cors");
const app = express();
const ytdl = require("ytdl-core");

const readline = require("readline");
const path = require("path");
const fs = require("fs");

app.use(cors());

const port = process.env.PORT || 5000;

app.get("/downloadVideo", async (req, res) => {
  // console.log(req.query);
  let videoLink = req.query.videoLink;
  let qualityLabel = req.query.qualityLabel;
  let quality;
  if (qualityLabel === "144p") {
    quality = 160;
  } else if (qualityLabel === "240p") {
    quality = 133;
  } else if (qualityLabel === "360p") {
    quality = 18;
  } else if (qualityLabel === "480p") {
    quality = 135;
  } else if (qualityLabel === "720p") {
    quality = 136;
  } else quality = 137;
  console.log(qualityLabel);

  // console.log(quality);
  res.header("Content-Disposition", "attachment");
  res.header("Content-Type", "video/mp4");

  let videoID = ytdl.getURLVideoID(videoLink);
  let info = await ytdl.getInfo(videoID);
  // console.log(info);

  // let videoName = info.player_response.videoDetails.title;
  // console.log(videoName);
  // console.log(info.formats);

  let format = ytdl.chooseFormat(info.formats, {
    filter: "audioandvideo",
    quality: quality,
  });

  console.log(format);

  ytdl(videoLink, { format: format }).pipe(res);
  let starttime;

  ytdl(videoLink).once("response", () => {
    starttime = Date.now();
  });

  ytdl(videoLink).on("progress", (chunkLength, downloaded, total) => {
    const percent = downloaded / total;
    const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
    const estimatedDownloadTime =
      downloadedMinutes / percent - downloadedMinutes;
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
    process.stdout.write(
      `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
        total /
        1024 /
        1024
      ).toFixed(2)}MB)\n`
    );
    process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
    process.stdout.write(
      `, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `
    );
    readline.moveCursor(process.stdout, 0, -1);
  });

  ytdl(videoLink).on("end", () => {
    process.stdout.write("\n\n");
  });
});

app.get("/downloadAudio", (req, res) => {
  let { audioLink } = req.query;
  console.log(audioLink);
  res.header("Content-Disposition", "attachment");
  res.header("Content-Type", "audio/mpeg");
  ytdl(audioLink, { filter: "audioonly" }).pipe(res);

  let starttime;

  ytdl(audioLink).once("response", () => {
    starttime = Date.now();
  });

  ytdl(audioLink).on("progress", (chunkLength, downloaded, total) => {
    const percent = downloaded / total;
    const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
    const estimatedDownloadTime =
      downloadedMinutes / percent - downloadedMinutes;
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
    process.stdout.write(
      `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
        total /
        1024 /
        1024
      ).toFixed(2)}MB)\n`
    );
    process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
    process.stdout.write(
      `, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `
    );
    readline.moveCursor(process.stdout, 0, -1);
  });

  ytdl(audioLink).on("end", () => {
    process.stdout.write("\n\n");
  });
});

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
