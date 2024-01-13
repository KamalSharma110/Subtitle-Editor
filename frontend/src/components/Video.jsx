import { useLocation } from "react-router-dom";
import { useRef, useState } from "react";

import classes from "./Video.module.css";
import Player from "./Player";
import Time from "./Time";

const Video = () => {
  const location = useLocation();
  const ref = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  

  const play = () => {
    ref.current.play();
  };

  const pause = () => {
    ref.current.pause();
  };

  const rewind = () => {
    ref.current.currentTime -= 1.5;
  };

  const forward = () => {
    ref.current.currentTime += 1.5;
  };

  return (
    <section className={classes["video-container"]}>
      <div>
        <video
          crossOrigin="anonymous"
          ref={ref}
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          onLoadedData={(e) => setDuration(e.target.duration)}
        >
          <source src={location.state.url} />
          {/* <track label="English" srcLang="en" src={subtitle} default={true} /> */}
        </video>
        <Time currentTime={currentTime} duration={duration} />
        <Player
          play={play}
          pause={pause}
          rewind={rewind}
          forward={forward}
          videoElementRef={ref}
        />
      </div>
    </section>
  );
};

export default Video;
