// import React, { useEffect, useState } from "react";

// const SubContext = React.createContext({
//   subtitles: [],
//   addSubtitle: () => {},
//   removeSubtitle: () => {},
//   setSubtitles: () => {},
//   setVideo: () => {},
// });

// export const SubContextProvider = (props) => {
//   const [subtitles, setSubtitles] = useState([]);
//   const [video, setVideo] = useState(null);

//   console.log(video);

//   // useEffect(() => {
//   //   let cues = video?.textTracks[0].cues || [];
//   //   cues = [...cues];
//   //   const arr = [];
//   //   cues.forEach((cue) => {
//   //     arr.push({
//   //       id: cue.id,
//   //       startTime: cue.startTime,
//   //       endTime: cue.endTime,
//   //       text: cue.text,
//   //     });
//   //   });
//   //   // console.log(arr);
//   //   // setSubtitles([...arr]);
//   // }, [video]);
//   // it should try to access cues after some time, otherwise there would be unexpected behavior

//   const addSubtitle = (id, startTime, endTime, text) => {
//     setSubtitles((prevState) => [
//       ...prevState,
//       { id, startTime, endTime, text },
//     ]);
//   };

//   const removeSubtitle = (id) => {
//     const updatedSubtitles = subtitles.filter((sub) => sub.id !== id);
//     setSubtitles([...updatedSubtitles]);
//   };

//   return (
//     <SubContext.Provider
//       value={{ subtitles, addSubtitle, removeSubtitle, setSubtitles, setVideo }}
//     >
//       {props.chidren}
//     </SubContext.Provider>
//   );
// };

// export default SubContext;
