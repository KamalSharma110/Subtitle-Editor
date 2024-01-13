import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./NavigationBar.module.css";
import { loadFile, loadPreviousProjects } from "../utils/api";

const NavigationBar = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      setVideos(await loadPreviousProjects());
    })();
  }, []);

  const clickHandler = (e) => {
    const target = e.target;
    const id = target.getAttribute("data-id");
    const title = target.getAttribute("data-title");
    const url = target.getAttribute("data-url");
    const subPath = target.getAttribute("data-subpath");

    let blob;
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = () => {
      blob = xhr.response;
    };
    xhr.onloadend = async() => {
      const videoElement = document.getElementsByTagName("video")[0];

      videoElement.getElementsByTagName('source')[0].src = URL.createObjectURL(blob);
      // videoElement.querySelector('track').src = 'http://localhost:8080/' + subPath;

      videoElement.controls = true;
        let track = document.createElement("track");
        track.kind = "subtitles";
        track.label = "English";
        track.srclang = "en";
        track.default = true;
        
        track.src = await loadFile(subPath);
        track.mode = "showing";
        videoElement.appendChild(track);
      // navigate("/edit", {
      //   state: {
      //     url: URL.createObjectURL(blob),
      //     subPath: "http://localhost:8080/" + subPath,
      //   },
      // });

      localStorage.setItem("id", id);
      localStorage.setItem("title", title);
    };
    xhr.open("GET", url);
    xhr.send();
  };

  return (
    <header className={classes.header}>
      <nav>
        <span>Subtitle Editor</span>
        <button>Load Previous Projects</button>
        <div onClick={clickHandler}>
          {videos.map((video) => {
            return (
              <span
                key={video._id}
                data-url={video.videoDownloadUrl}
                data-title={video.title}
                data-id={video._id}
                data-subpath={video.subtitlePath}
              >
                {video.title}
              </span>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
