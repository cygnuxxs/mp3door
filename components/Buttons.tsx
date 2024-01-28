"use client";
import React, { useState } from "react";

interface response {
  videoId: string;
  url: string;
  title: string;
  description: string;
  image: string;
  ago: string;
  views: number;
  artist: string;
  artistUrl: string;
}

interface request {
  videoId: string;
  title: string;
  bitrate: string;
}

const ButtonGroup = (response: response) => {
  const [downloadClicked, setDownloadClicked] = useState(false);
  const [selectedBitrate, setSelectedBitrate] = useState<string | null>(null);
  const [stopProgress, setStopProgress] = useState(true);

  const handleDownloadClick = () => {
    setDownloadClicked(true);
  };

  const handleBitrateClick = (bitrate: string) => {
    setSelectedBitrate(bitrate);
    download(bitrate);
  };
  const download = async (bitrate: string) => {
    const request: request = {
      videoId: response.videoId,
      title: response.title,
      bitrate: bitrate,
    };
    const res = await fetch(
      `/api/download/${response.videoId}/${encodeURIComponent(
        response.title
      )}/${bitrate}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );
    if (res) {
      const audioBlob = await res.blob();
      const url = URL.createObjectURL(audioBlob);
      var filename = `${request.title} (${request.bitrate}).mp3`;
      var fileLink = document.createElement("a");
      fileLink.href = url;
      fileLink.download = filename;
      fileLink.click();
      setStopProgress(false);
    }
    setSelectedBitrate(null);
    setStopProgress(true);
  };
  return (
    <div className="my-2 mx-1">
      {downloadClicked ? (
        selectedBitrate && stopProgress ? (
          <progress className="progress progress-accent w-full"></progress>
        ) : (
          ["320Kbps", "256Kbps", "128Kbps", "64Kbps"].map((bitrate) => (
            <button
              className="text-accent btn max-sm:btn-xs mr-2 mt-2 max-sm:my-1 hover:btn-accent"
              key={bitrate}
              onClick={() => handleBitrateClick(bitrate)}
            >
              {bitrate}
            </button>
          ))
        )
      ) : (
        <button
          className="text-accent btn mt-2 max-sm:my-1 max-sm:btn-xs hover:btn-accent"
          onClick={handleDownloadClick}
        >
          Download MP3
        </button>
      )}
    </div>
  );
};

export default ButtonGroup;
