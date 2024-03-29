import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
// import { v4 } from "uuid";

import app from "../firebase/firebase";

export const uploadFilesToFirebase = async (blob, navigate, setProgress) => {
  //   alert(`${title} file is going to be uploaded to firebase.`);
  const storage = getStorage(app);
  const storageRef = ref(storage, blob.name);
  const uploadTask = uploadBytesResumable(storageRef, blob);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress);
    },
    () => {},
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        await storeVideoUrl(downloadURL, blob.name);
        navigate("/home/edit", {
          state: { url: URL.createObjectURL(blob) },
        });
      });
    }
  );
};

export const formatTime = (time, needPrecision) => {
  let res = "";
  
  if(needPrecision) time = +(time.toFixed(3));
  else time = Math.ceil(time);

  // console.log(typeof time);
  res +=
    Math.floor(time / 60)
      .toString()
      .padStart(2, "0") +
    ":";
    time = needPrecision ? (time % 60).toFixed(3) : (time % 60);
    res += time.toString().padStart(2, "0");

  return res;
};

export const parser = () => {
  let res = "WEBVTT\n\n";
  let cues = document.querySelector('video').textTracks[0].cues;
  cues = [...cues];

  cues.forEach(cue => {
    res += `${cue.id}\n`;
    res += `${formatTime(cue.startTime, true)} --> ${formatTime(cue.endTime, true)}\n`;
    res += `${cue.text}\n\n`;
  });

  return res;
};

export const storeVideoUrl = async(url, title) => {
  const response = await fetch('https://subtitle-editor.onrender.com/store-video-url', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({url, title}),
  });

  const resData = await response.json();

  if(!response.ok){
    throw new Error('error');
  }

  localStorage.setItem('id', resData.id);
  localStorage.setItem('title', resData.title);
  return resData.id;
}

export const storeSubtitleFile = async(data) => {
  const response = await fetch('https://subtitle-editor.onrender.com/store-sub', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({data, id: localStorage.getItem('id')}),
  });

  const resData = await response.json();

  if(!response.ok){
    throw new Error('error');
  }

  return resData;
}

export const downloadSubtitleFile = () => {
  const element = document.createElement('a');
  element.href = 'https://subtitle-editor.onrender.com/download-sub/' + localStorage.getItem('id');
  element.download = localStorage.getItem('title') + '.vtt';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
