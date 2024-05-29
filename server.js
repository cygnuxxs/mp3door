import express from "express";
import next from "next";
import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.post("/api/download/:videoId/:title/:bitrate", (req, res) => {
    try {
      const {videoId, title, bitrate} = req.params
      const videoURL = `https://www.youtube.com/watch?v=${videoId}`;
      const options = {
        quality: "highestaudio",
        filter: "audioonly",
      };

      const stream = ytdl(videoURL, options);
      res.attachment(`${title} (${bitrate}).mp3`);
      ffmpeg(stream)
        .audioBitrate(parseInt(bitrate, 10))
        .toFormat("mp3")
        .on("error", console.error)
        .on("end", () => {
          console.log("Audio streamed successfully.");
          // res.json({notCompleted : false})
        })
        .pipe(res, { end: true });
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).send("Internal Server Error.");
    }
  });
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, '0.0.0.0', (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});