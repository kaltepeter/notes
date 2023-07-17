import { Slide, useScrollTrigger } from "@mui/material";
import React, { ReactElement } from "react";

interface HideOnScrollProps {
  window?: () => Window;
  children: React.ReactElement;
}

const HideOnScroll = ({
  children,
  window,
}: HideOnScrollProps): ReactElement => {
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="right" in={!trigger}>
      <div style={{ display: trigger ? "none" : "block" }}>{children}</div>
    </Slide>
  );
};

export default HideOnScroll;
