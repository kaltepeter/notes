import {
  AppBar,
  fade,
  IconButton,
  InputBase,
  Link,
  makeStyles,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import React, { ReactElement } from "react"
import NotesLogo from "../images/logo.svg"
import NotesIcon from "../images/notes-icon.svg"
import ElevationScroll from "./elevation-scroll"
import HideOnScroll from "./hide-on-scroll"
import theme from "./theme"

const cutSize = `${theme.spacing(3)}px`;

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    right: "auto",
    left: 0,
  },
  rootScrolled: {
    width: "200px",
    clipPath: `polygon(
      0% 0%, 
      100% 0%, 
      100% calc(100% - ${cutSize}), 
      calc(100% - ${cutSize}) 100%, 
      0% 100%
    )`,

    search: {
      display: "none",
    },
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
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
})

const defaultProps = {
  siteTitle: "",
}

type HeaderProps = {
  window?: () => Window
  children?: React.ReactElement
} & typeof defaultProps

const Header = ({ siteTitle, window }: HeaderProps): ReactElement => {
  const classes = useStyles()
  const trigger = useScrollTrigger({ target: window ? window() : undefined })

  return (
    <ElevationScroll>
      <AppBar
        color="primary"
        className={`${classes.root} ${trigger ? classes.rootScrolled : ""}`}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Link noWrap className={classes.title} href="/" variant="h1">
            <img src={NotesIcon} className={classes.notesIcon} />
            <img
              src={NotesLogo}
              className={classes.notesLogo}
              alt={siteTitle}
            />
          </Link>
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
  )
}

export default Header

Header.defaultProps = defaultProps
