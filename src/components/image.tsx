import Img from "gatsby-image"
import React, { ReactElement } from "react"
import { Box, Typography } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import { graphql, useStaticQuery } from "gatsby"

const useStyles = makeStyles({ name: "Image" })(_theme => ({
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
}))

const Image = (): ReactElement => {
  const { classes } = useStyles()
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(
        relativePath: { eq: "notebook-laptop-unsplash.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 3456, maxHeight: 4087) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  if (!data?.placeholderImage?.childImageSharp?.fluid) {
    return <div>Picture not found</div>
  }

  return (
    <>
      <Box className={classes.root}>
        <a href="#">
          <Img
            fluid={data.placeholderImage.childImageSharp.fluid}
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
  )
}

export default Image
