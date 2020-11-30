/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
import "fontsource-merriweather/900-italic.css";
import "fontsource-merriweather/700-italic.css";
import "fontsource-merriweather/400.css";
import "fontsource-libre-franklin/700-normal.css";
import "fontsource-libre-franklin/500-normal.css";
import "fontsource-libre-franklin/400.css";
import "fontsource-libre-franklin/300-normal.css";
import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Container from "@material-ui/core/Container/Container"
import { Box, CssBaseline, ThemeProvider, Toolbar } from "@material-ui/core"
import theme from "./theme"

const Layout: React.FC = ({ children }) => {
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
      <Toolbar />
      <Container>
        <Box my={2} component="main">{children}</Box>
        <Box component="footer">
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
      </Container>
    </ThemeProvider>
  )
}

export default Layout
