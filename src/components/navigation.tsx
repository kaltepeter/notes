import {
    createStyles,
    Divider,
    Drawer,
    Hidden,
    ListItemText,
    makeStyles,
    Theme,

    useTheme
} from "@material-ui/core"
import ListItem from "@material-ui/core/ListItem"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { TreeItem } from "@material-ui/lab"
import TreeView from "@material-ui/lab/TreeView"
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
  })
)

const Navigation: React.FC<NavigationProps> = props => {
  const { drawerOpen, onToggleDrawer } = props;
  const classes = useStyles(props)
  const theme = useTheme()
  const { pages, allTags, allPaths } = usePageTree()

  const getTreeLabel = (node: Path) => (
    <ListItem component="div">
      {node.slug?.length > 0 ? (
        <Link to={node.slug}>
          <ListItemText primary={node.name} />
        </Link>
      ) : (
        <ListItemText primary={node.name} />
      )}
    </ListItem>
  )

  const renderTree = (nodes: PathList) => {
    return (
      <>
        {Object.entries(nodes).map(([tId, tPath]) => (
          <TreeItem key={tId} nodeId={tId} label={getTreeLabel(tPath)}>
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

  return (
    <>
      <nav className={classes.drawer} aria-label="notes">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={drawerOpen}
            onClose={onToggleDrawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawerChildren()}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawerChildren()}
          </Drawer>
        </Hidden>
      </nav>
    </>
  )
}

export { Navigation }
export default Navigation
