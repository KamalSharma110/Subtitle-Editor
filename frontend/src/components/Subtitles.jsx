import { useEffect, useState } from "react";

import Subtitle from "./Subtitle";
import { downloadSubtitleFile, parser, storeSubtitleFile } from "../utils/api";

const Subtitles = () => {
  let disableSaveBtn = true;
  const [subtitles, setSubtitles] = useState([]);
  const [isDisabled, disableDwnldBtn] = useState(true);

  (function(){
    for (const sub of subtitles) {
      if(sub.text !== "") {
        disableSaveBtn = false;
        return;
      }
    }
    disableSaveBtn = true;
  }());

  useEffect(() => {
    const videoElement = document.getElementsByTagName("video")[0];
    if (!videoElement.textTracks[0]) {
      let track = document.createElement("track");
      track.kind = "subtitles";
      track.label = "English";
      track.srclang = "en";
      track.default = true;

      track.mode = "showing";
      videoElement.appendChild(track);
    }
  }, []);

  const addSubtitle = () => {
    const video = document.querySelector("video");

    const latestSub = subtitles[subtitles.length - 1];
    const id = latestSub ? (+latestSub.id + 1).toString() : "1";
    const text = latestSub?.text || "";
    const startTime = video.currentTime;
    const endTime = startTime + 3;
    const cue = new VTTCue(startTime, endTime, text);

    cue.id = id;

    video.textTracks[0].addCue(cue);

    setSubtitles((prevState) => [
      ...prevState,
      { id, startTime, endTime, text },
    ]);
  };

  const removeSubtitle = (id) => {
    const updatedSubtitles = subtitles.filter((sub) => sub.id !== id);
    setSubtitles([...updatedSubtitles]);
  };

  const saveHandler = async () => {
    const data = parser();
    disableDwnldBtn(! await storeSubtitleFile(data));
  };

  return (
    <>
      <div>
        <button onClick={saveHandler} disabled={disableSaveBtn}>
          Save Subtitles <ion-icon name="checkmark-outline"></ion-icon>
        </button>
        <button onClick={() => {disableDwnldBtn(true); downloadSubtitleFile();}} disabled={isDisabled}>
          Download Subtitles <ion-icon name="cloud-download-outline"></ion-icon>
        </button>
      </div>
      <hr />
      {subtitles.length > 0 && <ul>
        {subtitles.map((cue) => {
          return (
            <li key={cue.id} style={{ listStyle: "none" }}>
              <Subtitle
                text={cue.text}
                startTime={cue.startTime}
                endTime={cue.endTime}
                id={cue.id}
                removeSubtitle={removeSubtitle}
                subtitles={subtitles}
                setSubtitles={setSubtitles}
              />
            </li>
          );
        })}
      </ul>}
      <button onClick={addSubtitle}>
        <ion-icon name="add-outline"></ion-icon>Add New Subtitles Line
      </button>
    </>
  );
};

export default Subtitles;
