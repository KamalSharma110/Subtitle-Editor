import { formatTime } from "../utils/api";

const Time = ({ duration, currentTime }) => {

  return (
    <span style={{ color: "dimgray", justifySelf: "end", fontWeight: '600' }}>
      {formatTime(currentTime, false) + " / " + formatTime(duration, false)}
    </span>
  );
};

export default Time;
