import { Hidden, Theme } from "@mui/material"
import {
  AppBar,
  alpha,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import { Link } from "gatsby"
import React, { ReactElement, useState } from "react"
import NotesLogo from "../images/logo.svg"
import NotesIcon from "../images/notes-icon.svg"
import ElevationScroll from "./elevation-scroll"
import HideOnScroll from "./hide-on-scroll"
import { Navigation } from "./navigation"


const useStyles = makeStyles<HeaderProps>()((theme, {drawerWidth}) => {
  const cutSize = theme.spacing(3)

  return {
    root: {
      flexGrow: 1,
      right: "auto",
      left: 0,
      [theme.breakpoints.up("sm")]: {
        marginLeft: drawerWidth,
      },
    },
    rootUnscrolled: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    rootScrolled: {
      [theme.breakpoints.up("sm")]: {
        width: "200px",
      },
      clipPath: `polygon(
      0% 0%, 
      100% 0%, 
      100% calc(100% - ${cutSize}), 
      calc(100% - ${cutSize}) 100%, 
      0% 100%
    )`,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "flex",
      },
      alignItems: "center",
      padding: theme.spacing(2, 0),
      "& a": {
        display: "inline-flex",
      },
    },
    notesIcon: {
      height: "20px",
      paddingRight: theme.spacing(1),
    },
    notesLogo: {
      height: "20px",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  };
});

const defaultProps = {
  siteTitle: "",
}

type HeaderProps = {
  window?: () => Window
  children?: React.ReactElement
  drawerWidth: number
} & typeof defaultProps

const Header = (props: HeaderProps): ReactElement => {
  const { siteTitle, window, drawerWidth } = props
  const { classes } = useStyles(props, {
    props: props
  })
  const trigger = useScrollTrigger({ target: window ? window() : undefined })
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  return <>
    <ElevationScroll>
      <AppBar
        position="fixed"
        color="primary"
        className={`${classes.root} ${
          trigger ? classes.rootScrolled : classes.rootUnscrolled
        }`}
      >
        <Toolbar>
          <Hidden smUp implementation="css">
            <IconButton
              edge="start"
              className={classes.menuButton}
              onClick={e => handleDrawerToggle()}
              color="inherit"
              aria-label="open drawer"
              size="large">
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography
            noWrap
            variant="h1"
            component="span"
            className={classes.title}
          >
            <Link to={"/"}>
              <img src={NotesIcon} className={classes.notesIcon} />
              <img
                src={NotesLogo}
                className={classes.notesLogo}
                alt={siteTitle}
              />
            </Link>
          </Typography>
          <HideOnScroll>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </HideOnScroll>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
    <Navigation
      drawerWidth={drawerWidth}
      onToggleDrawer={handleDrawerToggle}
      drawerOpen={drawerOpen}
    />
  </>;
}

export default Header

Header.defaultProps = defaultProps
