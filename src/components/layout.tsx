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
import { styled } from "@mui/material/styles";
import { graphql, useStaticQuery } from "gatsby";
import React, { ReactNode } from "react";
import Header from "./header";
import { CacheProvider } from "@emotion/react";
import { makeMuiCache } from "../theme/cache";
import theme from "./theme";

const DRAWER_WIDTH = 280;

const LayoutRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
  },
}));

const MainContent = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    marginLeft: `${DRAWER_WIDTH}px`,
  },
}));

const Footer = styled("footer")(({ theme }) => ({
  width: "100vw",
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(2),
  display: "block",
  [theme.breakpoints.up("sm")]: {
    marginLeft: `${DRAWER_WIDTH}px`,
  },
}));

type LayoutProps = {
  children?: React.ReactNode;
};

const muiCache = makeMuiCache();

// This component exists because of https://mui.com/material-ui/migration/migration-v4/#set-up-themeprovider
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitle {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <LayoutRoot>
      <Header
        drawerWidth={DRAWER_WIDTH}
        siteTitle={data.site.siteMetadata?.title || `Title`}
      />
      <MainContent>{children}</MainContent>
      <Footer>
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
      </Footer>
    </LayoutRoot>
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

export { LayoutWrapper };
export default LayoutWrapper;
