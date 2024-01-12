import { formatTime } from "../utils/api";

const Time = ({ duration, currentTime }) => {

  return (
    <span style={{ color: "dimgray", justifySelf: "start" }}>
      {formatTime(currentTime, false) + " / " + formatTime(duration, false)}
    </span>
  );
};

export default Time;
