import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "gatsby";
import React, { ReactElement, useCallback, useState } from "react";
import NotesLogo from "../images/logo.svg";
import NotesIcon from "../images/notes-icon.svg";
import ElevationScroll from "./elevation-scroll";
import HideOnScroll from "./hide-on-scroll";
import { Navigation } from "./navigation";
import SearchInput from "./search-input";

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "drawerWidth" && prop !== "scrolled",
})<{ drawerWidth: number; scrolled: boolean }>(
  ({ theme, drawerWidth, scrolled }) => ({
    flexGrow: 1,
    right: "auto",
    left: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: `${drawerWidth}px`,
      width: scrolled ? "200px" : `calc(100% - ${drawerWidth}px)`,
    },
    ...(scrolled && {
      clipPath: `polygon(0% 0%, 100% 0%, 100% calc(100% - ${theme.spacing(3)}), calc(100% - ${theme.spacing(3)}) 100%, 0% 100%)`,
    }),
  }),
);

const MobileMenuButton = styled(Box)({
  display: "block",
  "@media (min-width: 600px)": {
    display: "none",
  },
});

const HeaderTitle = styled((props: React.ComponentProps<typeof Typography>) => (
  <Typography component="span" {...props} />
))(({ theme }) => ({
  flexGrow: 1,
  display: "none",
  alignItems: "center",
  padding: theme.spacing(2, 0),
  "& a": { display: "inline-flex" },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const NavIcon = styled("img")({
  height: "20px",
  paddingRight: "8px",
});

const NavLogo = styled("img")({
  height: "20px",
});


type HeaderProps = {
  siteTitle?: string;
  window?: () => Window;
  children?: React.ReactElement;
  drawerWidth: number;
};

const Header = ({ siteTitle = "", window, drawerWidth }: HeaderProps): ReactElement => {
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleDrawerToggle = useCallback(() => {
    setDrawerOpen((open) => !open);
  }, []);

  return (
    <>
      <ElevationScroll>
        <StyledAppBar
          position="fixed"
          color="primary"
          drawerWidth={drawerWidth}
          scrolled={trigger}
        >
          <Toolbar>
            <MobileMenuButton>
              <IconButton
                edge="start"
                sx={{ marginRight: 2 }}
                onClick={handleDrawerToggle}
                color="inherit"
                aria-label="open drawer"
                size="large"
              >
                <MenuIcon />
              </IconButton>
            </MobileMenuButton>
            <HeaderTitle noWrap variant="h1">
              <Link to={"/"}>
                <NavIcon src={NotesIcon} />
                <NavLogo src={NotesLogo} alt={siteTitle} />
              </Link>
            </HeaderTitle>
            <HideOnScroll>
              <SearchInput />
            </HideOnScroll>
          </Toolbar>
        </StyledAppBar>
      </ElevationScroll>
      <Navigation
        drawerWidth={drawerWidth}
        onToggleDrawer={handleDrawerToggle}
        drawerOpen={drawerOpen}
      />
    </>
  );
};

export default Header;
