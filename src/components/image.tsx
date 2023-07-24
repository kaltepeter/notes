import { Box, Typography } from "@mui/material";
import { StaticImage } from "gatsby-plugin-image";
import React, { ReactElement } from "react";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({ name: "Image" })((_theme) => ({
  root: {
    position: "relative",
    top: "-15vh",
  },
  overlay: {
    display: "none",
    backgroundColor: _theme.palette.secondary.main,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: "50%",
  },
}));

const Image = (): ReactElement => {
  const { classes } = useStyles();

  return (
    <>
      <Box className={classes.root}>
        <a href="#">
          <StaticImage
            src="../images/notebook-laptop-unsplash.jpg"
            placeholder="blurred"
            alt="Notebook and laptop image"
          />
          <div className={classes.overlay}></div>
        </a>
      </Box>
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
