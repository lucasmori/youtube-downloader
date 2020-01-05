const express = require("express");
const bodyParser = require("body-parser");
const ytdl = require("ytdl-core");
const fs = require("fs");
const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.post("/video", (req, res) => {
  video = req.body.video;
  format = req.body.format;

  let music = download(video, format);
  res.send(music);
});

async function download(video, typeFormat) {
  try {
    var title = ytdl.getURLVideoID(video);

    let file = ytdl(video, {
      filter: format => format.container === `${typeFormat}`
    }).pipe(fs.createWriteStream(`${title}.${typeFormat}`));

    return file;
  } catch (e) {
    throw new Error(e);
  }
}

server.listen(8080, () => {
  console.log("Server is running on url http://localhost:8080");
});
