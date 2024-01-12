import { useEffect, useState } from "react";

import Subtitle from "./Subtitle";
import { downloadSubtitleFile, parser, storeSubtitleFile } from "../utils/api";

const Subtitles = () => {
  const [subtitles, setSubtitles] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      let cues = document.querySelector("video").textTracks[0].cues;
      cues = [...cues];
      const arr = [];
      cues.forEach((cue) => {
        arr.push({
          id: cue.id,
          startTime: cue.startTime,
          endTime: cue.endTime,
          text: cue.text,
        });
      });

      setSubtitles(arr);
    }, 200);
  }, []);
  //it should try to access cues after some time, otherwise there would be unexpected behavior

  const addSubtitle = () => {
    const video = document.querySelector("video");

    const latestSub = subtitles[subtitles.length - 1];
    const id = (+latestSub?.id + 1).toString() || '1';
    const text = latestSub?.text || '';
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

  const saveHandler = async() => {
    const data = parser();
    await storeSubtitleFile(data);
  };

  return (
    <>
      <ul>
        {subtitles.map((cue) => {
          return (
            <li key={cue.id} style={{ listStyle: "none" }}>
              <Subtitle
                text={cue.text}
                startTime={cue.startTime}
                endTime={cue.endTime}
                id={cue.id}
                removeSubtitle={removeSubtitle}
              />
            </li>
          );
        })}
      </ul>
      <button onClick={addSubtitle}>+ &nbsp; Add New Subtitles Line</button>
      <button onClick={saveHandler}>Save Subtitles &#10003;</button>
      <ion-icon name="download-outline" onClick={downloadSubtitleFile}></ion-icon>
    </>
  );
};

export default Subtitles;
