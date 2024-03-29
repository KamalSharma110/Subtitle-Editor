import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { uploadFilesToFirebase } from "../utils/api";
import Backdrop from "./Backdrop";
import classes from "./Modal.module.css";

const Modal = (props) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const fileChangeHandler = (e) => {
    uploadFilesToFirebase(e.target.files[0], navigate, setProgress);
  };

  return (
    <>
      <Backdrop />
      <section className={classes.modal}>
        <h3>Add Subtitles to Video</h3>
        <ion-icon
          name="close-outline"
          onClick={() => props.setShowModal(false)}
        ></ion-icon>
        <label htmlFor="video-file">
          <span>
            <ion-icon name="cloud-upload-outline"></ion-icon>
            {progress > 0
              ? `Uploading... ${Math.floor(progress)}%`
              : "Upload a Video File"}
          </span>
        </label>
        <input type="file" id="video-file" onChange={fileChangeHandler} />
      </section>
    </>
  );
};

export default Modal;
