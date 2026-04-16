import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { StaticImage } from "gatsby-plugin-image";
import React, { ReactElement } from "react";

const ImageWrapper = styled(Box)({
  position: "relative",
  top: "-15vh",
});

const ImageOverlay = styled(Box)(({ theme }) => ({
  display: "none",
  backgroundColor: theme.palette.secondary.main,
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  opacity: "50%",
}));

const Image = (): ReactElement => {
  return (
    <>
      <ImageWrapper>
        <a href="#">
          <StaticImage
            src="../images/notebook-laptop-unsplash.jpg"
            placeholder="blurred"
            alt="Notebook and laptop image"
          />
          <ImageOverlay />
        </a>
      </ImageWrapper>
      <Typography variant="caption">
        Photo by{" "}
        <a href="https://unsplash.com/@tracycodes?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
          Tracy Adams
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/s/photos/note-taking?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
          Unsplash
        </a>
      </Typography>
    </>
  );
};

export default Image;
