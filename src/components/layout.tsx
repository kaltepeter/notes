/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
import {
  Box,
  CssBaseline,
  makeStyles,
  Theme,
  ThemeProvider,
} from "@material-ui/core"
import "@fontsource/libre-franklin/300.css"
import "@fontsource/libre-franklin/400.css"
import "@fontsource/libre-franklin/500.css"
import "@fontsource/libre-franklin/700.css"
import "@fontsource/merriweather/400.css"
import "@fontsource/merriweather/700-italic.css"
import "@fontsource/merriweather/900-italic.css"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Header from "./header"
import theme from "./theme"

type LayoutProps = {
  drawerWidth: number
}

const useStyles = makeStyles<Theme, LayoutProps>(theme => ({
  root: {
    display: "flex",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
    },
    flexDirection: "column",
  },
  content: {
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      marginLeft: props => props.drawerWidth,
    },
    padding: theme.spacing(3),
  },
  footer: {
    width: "100vw",
    background: theme.palette.primary.main,
    padding: theme.spacing(2),
    display: "block",
    [theme.breakpoints.up("sm")]: {
      marginLeft: props => props.drawerWidth,
    },
  },
}))

const Layout: React.FC = ({ children }) => {
  const drawerWidth = 400
  const classes = useStyles({ drawerWidth })

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
      <div className={classes.root}>
        <Header
          drawerWidth={drawerWidth}
          siteTitle={data.site.siteMetadata?.title || `Title`}
        />
        {/* <Toolbar>
      </Toolbar> */}
        <Box my={2} component="main" className={classes.content}>
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
      </div>
    </ThemeProvider>
  )
}

export default Layout
