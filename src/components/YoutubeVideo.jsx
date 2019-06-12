import React from "react";

export default function YoutubeVideo({ videoId }) {
  return (
    <iframe
      title="youtube"
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
