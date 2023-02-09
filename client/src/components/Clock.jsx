import { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

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

  return (
    <Box className="clock">
      <Box
        component="img"
        src="/imgs/clock.svg"
        alt="clock"
        sx={{
          // backgroundColor: `${colors.purpleAccent[400]}`,
          fill: `${colors.purpleAccent[400]}`,
        }}
      />
      <Box
        className="hour hand"
        id="hour"
        style={{ transform: "rotate(" + time.hour + "deg)" }}
      ></Box>
      <Box
        className="minute hand"
        id="minute"
        style={{ transform: "rotate(" + time.min + "deg)" }}
      ></Box>
      <Box
        className="seconds hand"
        id="seconds"
        style={{ transform: "rotate(" + time.sec + "deg)" }}
      ></Box>
    </Box>
  );
};

export default Clock;
