import { useState } from "react";
import ReactDOM from "react-dom";

import sub from "../assets/sub.png";
import classes from "./Home.module.css";
import Modal from "../Modal/Modal";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className={classes.home}>
        <div>
          <h1>Add Subtitles to Video</h1>
          <button onClick={() => setShowModal(true)}>
            Add subtitles to your video
            <ion-icon name="cloud-upload-outline"></ion-icon>
          </button>
        </div>
        <img src={sub} alt="sub" />
      </section>
      {showModal &&
        ReactDOM.createPortal(
          <Modal setShowModal={setShowModal} />,
          document.getElementById("root")
        )}
    </>
  );
};

export default Home;
