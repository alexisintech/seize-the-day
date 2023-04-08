import { useState } from "react";
import { tokens } from "../theme";
import { Box, useTheme } from "@mui/material";

const Clock = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [time, setTime] = useState({});

  var set_clock = setInterval(function clock() {
    var date_now = new Date();
    var hr = date_now.getHours();
    var min = date_now.getMinutes();
    var sec = date_now.getSeconds();

    var calc_hr = hr * 30 + min / 2;
    var calc_min = min * 6 + sec / 10;
    var calc_sec = sec * 6;

    setTime({
      hour: calc_hr,
      min: calc_min,
      sec: calc_sec,
    });
  }, 1000);

  set_clock;

  const styles = {
    hand: {
      backgroundColor: colors.purpleAccent[500],
    },
    clock: {
      border:
        theme.palette.mode === "dark"
          ? "2px solid rgba(255,255,255,0.1)"
          : "2px solid rgba(219, 217, 217, 0.5)",
    },
  };

  return (
    <Box className="clock" style={{ ...styles.clock }}>
      <Box
        className="hour hand"
        id="hour"
        style={{
          transform: "rotate(" + time.hour + "deg)",
          ...styles.hand,
        }}
      ></Box>
      <Box
        className="minute hand"
        id="minute"
        style={{ transform: "rotate(" + time.min + "deg)", ...styles.hand }}
      ></Box>
      <Box
        className="seconds hand"
        id="seconds"
        style={{ transform: "rotate(" + time.sec + "deg)", ...styles.hand }}
      ></Box>
    </Box>
  );
};

export default Clock;
