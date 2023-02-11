import { Divider, Drawer, alpha, Hidden, ListItemText, Theme, Typography, useTheme } from "@mui/material";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import ListItem from "@mui/material/ListItem"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { TreeItem } from "@mui/lab"
import TreeView from "@mui/lab/TreeView"
import { Link } from "gatsby"
import React from "react"
import { Path, PathList, usePageTree } from "../hooks/use-page-tree"

interface NavigationProps {
  drawerOpen: boolean
  onToggleDrawer: () => void
  drawerWidth: number
}

const useStyles = makeStyles<Theme, NavigationProps>((theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: props => props.drawerWidth,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: props => props.drawerWidth,
    },
    activeNavLink: {
        color: theme.palette.text.primary,
        fontWeight: 900
    },
    navLink: {
        color: 'inherit',
        textDecoration: 'none'
    },
  })
)

const Navigation: React.FC<NavigationProps> = props => {
  const { drawerOpen, onToggleDrawer } = props;
  const classes = useStyles(props)
  const theme = useTheme()
  const { pages, allTags, allPaths } = usePageTree();

  const titleCase = (sentence) => sentence.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

  const getTreeLabel = (node: Path) => (
    <div>
      {node.slug?.length > 0 ? (
        <Link to={node.slug} className={classes.navLink} partiallyActive={true} activeClassName={classes.activeNavLink}>
          {titleCase(node.name)}
        </Link>
      ) : titleCase(node.name)}
      </div>
  )

  const renderTree = (nodes: PathList) => {
    return (
      <>
        {Object.entries(nodes).map(([tId, tPath]) => (
          <TreeItem key={tId} nodeId={tId} label={getTreeLabel(tPath)} className={classes.treeItem}>
            {Object.keys(tPath.children).length > 0
              ? Object.entries(tPath.children).map(([id, node]) =>
                  renderTree({ [id]: { ...node } })
                )
              : null}
          </TreeItem>
        ))}
      </>
    )
  }

  const drawerChildren = () => (
    <>
      <div className={classes.toolbar} />
      <Divider />
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        // defaultExpanded={["root"]}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(allPaths["root"].children)}
      </TreeView>
    </>
  )

  return <>
    <nav className={classes.drawer} aria-label="notes">
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={drawerOpen}
          onClose={onToggleDrawer}
          classes={{
            paper: classes.drawerPaper,
            modal: classes.modal
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawerChildren()}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
            modal: classes.modal
          }}
          variant="permanent"
          open
        >
          {drawerChildren()}
        </Drawer>
      </Hidden>
    </nav>
  </>;
}

export { Navigation }
export default Navigation
