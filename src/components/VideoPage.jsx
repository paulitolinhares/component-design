import React from "react";
import YoutubeVideo from "./YoutubeVideo";
import YoutubeVideoWithRoute from "./YoutubeVideoWithRoute";

export default function VideoPage({ match }) {
  const { videoId } = match.params;
  return (
    <>
      <h1>YoutubeVideo</h1>
      <br />
      <YoutubeVideo videoId={videoId} />
      <br />
      <h1>YoutubeVideoWithRoute</h1>
      <br />
      <YoutubeVideoWithRoute route={match} />
    </>
  );
}
