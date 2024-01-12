import { useState } from "react";

import classes from "./Player.module.css";

let clear;
const Player = ({ play, pause, rewind, forward, videoElementRef : ref }) => {
  const [paused, setPaused] = useState(false);

  const clickHandler = () => {
    if (!paused) play();
    else pause();

    setPaused((prevState) => !prevState);
  };

  const mouseDownHandler = (e) => {
    ref.current.muted = true;
    clear = setInterval(() => {
      e.target.id === "play-back" ? rewind() : forward();
    }, 100);
  };

  const mouseUpHandler = () => {
    ref.current.muted = false;
    clear && clearInterval(clear);
  };

  return (
    <div className={classes.player}>
      <ion-icon
        id="play-back"
        name="play-back"
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
      ></ion-icon>
      <ion-icon
        name={paused ? "pause" : "play"}
        onClick={clickHandler}
      ></ion-icon>
      <ion-icon
        id="play-forward"
        name="play-forward"
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
      ></ion-icon>

    </div>
  );
};

export default Player;
