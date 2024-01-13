import { useEffect } from "react";

import classes from "./Subtitle.module.css";
import { formatTime } from "../utils/api";

let video;
let textTrack;
const Subtitle = ({
  id,
  startTime,
  endTime,
  text,
  removeSubtitle,
  subtitles,
  setSubtitles,
}) => {
  useEffect(() => {
    video = document.getElementsByTagName("video")[0];
    textTrack = video.textTracks[0];
  }, []);

  const changeHandler = (e) => {
    let cue = textTrack.cues.getCueById(id);
    //should retrieve cue only just right before we need it because cues are dynamically changing data
    cue.text = e.target.value;

    setSubtitles(
      subtitles.map((sub) => {
        if (sub.id === id) {
          sub.text = e.target.value;
          return sub;
        } else return sub;
      })
    );
  };

  const startTimeHandler = (e) => {
    let cue = textTrack.cues.getCueById(id);

    cue.startTime = video.currentTime;

    setSubtitles(
      subtitles.map((sub) => {
        if (sub.id === id) {
          sub.startTime = video.currentTime;
          return sub;
        } else return sub;
      })
    );
  };

  const endTimeHandler = () => {
    let cue = textTrack.cues.getCueById(id);

    cue.endTime = video.currentTime;

    setSubtitles(
      subtitles.map((sub) => {
        if (sub.id === id) {
          sub.endTime = video.currentTime;
          return sub;
        } else return sub;
      })
    );
  };

  const removeHandler = () => {
    textTrack.removeCue(textTrack.cues.getCueById(id));
    removeSubtitle(id);
  };

  return (
    <div className={classes.subtitle}>
      <input
        type="text"
        placeholder="New Text"
        value={text}
        onChange={changeHandler}
      />
      <div>
        <span onClick={startTimeHandler}>
          <ion-icon name="time-outline"></ion-icon> &nbsp; In
        </span>
        <span onClick={endTimeHandler}>
          <ion-icon name="time-outline"></ion-icon> &nbsp; Out
        </span>
      </div>
      <div>
        <span>{formatTime(startTime, true)}</span>
        <span>{formatTime(endTime, true)}</span>
      </div>
      <ion-icon name="trash-outline" onClick={removeHandler}></ion-icon>
    </div>
  );
};

export default Subtitle;
