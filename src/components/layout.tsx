/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
import {
  Box,
  CssBaseline,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import "@fontsource/libre-franklin/300.css";
import "@fontsource/libre-franklin/400.css";
import "@fontsource/libre-franklin/500.css";
import "@fontsource/libre-franklin/700.css";
import "@fontsource/merriweather/400.css";
import "@fontsource/merriweather/700-italic.css";
import "@fontsource/merriweather/900-italic.css";
import { graphql, useStaticQuery } from "gatsby";
import React, { ReactNode } from "react";
import Header from "./header";
import { CacheProvider } from "@emotion/react";
import { makeMuiCache } from "../theme/cache";
import theme from "./theme";

type LayoutProps = {
  drawerWidth?: number;
  children?: React.ReactNode;
};

const useStyles = makeStyles<LayoutProps>({ name: "Layout" })(
  (_theme, { drawerWidth }) => ({
    root: {
      display: "flex",
      padding: _theme.spacing(2),
      [_theme.breakpoints.up("sm")]: {
        padding: _theme.spacing(3),
      },
      flexDirection: "column",
    },
    content: {
      flexGrow: 1,
      [_theme.breakpoints.up("sm")]: {
        marginLeft: drawerWidth,
      },
      padding: _theme.spacing(3),
    },
    footer: {
      width: "100vw",
      background: _theme.palette.primary.main,
      padding: _theme.spacing(2),
      display: "block",
      [_theme.breakpoints.up("sm")]: {
        marginLeft: drawerWidth,
      },
    },
  }),
);

const muiCache = makeMuiCache();

// This component exists because of https://mui.com/material-ui/migration/migration-v4/#set-up-themeprovider
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const drawerWidth = 400;
  const { classes } = useStyles({ drawerWidth });

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
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
  );
};

const LayoutWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <CacheProvider value={muiCache}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout children={children} />
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
};

export { LayoutWrapper as Layout };
export default LayoutWrapper;
