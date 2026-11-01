import { useEffect, useState } from "react";

import { useTheme } from "../../providers/theme";

const FRAMES = [
  "▰▱▱▱▱▱▱",
  "▱▰▱▱▱▱▱",
  "▱▱▰▱▱▱▱",
  "▱▱▱▰▱▱▱",
  "▱▱▱▱▰▱▱",
  "▱▱▱▱▱▰▱",
  "▱▱▱▱▱▱▰",
  "▱▱▱▱▱▰▱",
  "▱▱▱▱▰▱▱",
  "▱▱▱▰▱▱▱",
  "▱▱▰▱▱▱▱",
  "▱▰▱▱▱▱▱",
] as const;

const FRAME_INTERVAL = 80;

function Spinner() {
  const { colors } = useTheme();
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((current) => (current + 1) % FRAMES.length);
    }, FRAME_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <text fg={colors.primary}>{FRAMES[frameIndex]}</text>;
}

export default Spinner;
