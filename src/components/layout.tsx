/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
import "fontsource-merriweather/900-italic.css"
import "fontsource-merriweather/700-italic.css"
import "fontsource-merriweather/400.css"
import "fontsource-libre-franklin/700-normal.css"
import "fontsource-libre-franklin/500-normal.css"
import "fontsource-libre-franklin/400.css"
import "fontsource-libre-franklin/300-normal.css"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Container from "@material-ui/core/Container/Container"
import {
  Box,
  CssBaseline,
  makeStyles,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
} from "@material-ui/core"
import theme from "./theme"

const useStyles = makeStyles({
  root: {
    display: "flex",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
    },
    flexDirection: "column",

    "& main": {
      display: "flex",
      flexDirection: "row",
    },
  },
  footer: {
    width: "100vw",
    background: theme.palette.primary.main,
    padding: theme.spacing(2),
    display: "block",
  },
})

const Layout: React.FC = ({ children }) => {
  const classes = useStyles()

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <Toolbar>
      </Toolbar>
      <Box my={2} component="main">
        {children}
      </Box>
      <Box component="footer" className={classes.footer}>
        © {new Date().getFullYear()} Kayla Altepeter, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
        <div>
          Icons made by{" "}
          <a href="http://www.freepik.com/" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </Box>
    </ThemeProvider>
  )
}

export default Layout