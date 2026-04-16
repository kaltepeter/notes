import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { Box, Divider, Drawer, Toolbar, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "gatsby";
import React from "react";
import { Path, PathList, usePageTree } from "../hooks/use-page-tree";

interface NavigationProps {
  drawerOpen: boolean;
  onToggleDrawer: () => void;
  drawerWidth: number;
}

const NavContainer = styled("nav", {
  shouldForwardProp: (prop) => prop !== "drawerWidth",
})<{ drawerWidth: number }>(({ theme, drawerWidth }) => ({
  [theme.breakpoints.up("sm")]: {
    width: `${drawerWidth}px`,
    flexShrink: 0,
  },
}));

const MobileNav = styled(Box)({
  display: "block",
  "@media (min-width: 600px)": {
    display: "none",
  },
});

const DesktopNav = styled(Box)({
  display: "none",
  "@media (min-width: 1200px)": {
    display: "block",
  },
});

const NavDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "drawerWidth",
})<{ drawerWidth: number }>(({ drawerWidth }) => ({
  "& .MuiDrawer-paper": {
    width: `${drawerWidth}px`,
  },
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: "inherit",
  textDecoration: "none",
  "&.active": {
    color: theme.palette.text.primary,
    fontWeight: 900,
  },
}));

const Navigation: React.FC<NavigationProps> = (props) => {
  const { drawerOpen, onToggleDrawer, drawerWidth } = props;
  const theme = useTheme();
  const { allPaths } = usePageTree();

  const titleCase = (sentence: string) =>
    sentence.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

  const getTreeLabel = (node: Path) => (
    <div>
      {node.slug && node.slug?.length > 0 ? (
        <NavLink to={node.slug} partiallyActive={true}>
          {titleCase(node.name)}
        </NavLink>
      ) : (
        titleCase(node.name)
      )}
    </div>
  );

  const renderTree = (nodes: PathList) => {
    return (
      <>
        {Object.entries(nodes).map(([tId, tPath]) => (
          <TreeItem key={tId} itemId={tId} label={getTreeLabel(tPath)}>
            {Object.keys(tPath.children).length > 0
              ? renderTree(tPath.children)
              : null}
          </TreeItem>
        ))}
      </>
    );
  };

  const drawerChildren = () => (
    <>
      <Toolbar />
      <Divider />
      <SimpleTreeView
        slots={{ collapseIcon: ExpandMoreIcon, expandIcon: ChevronRightIcon }}
      >
        {renderTree(allPaths["root"].children)}
      </SimpleTreeView>
    </>
  );

  return (
    <NavContainer aria-label="notes" drawerWidth={drawerWidth}>
      <MobileNav>
        <NavDrawer
          drawerWidth={drawerWidth}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={drawerOpen}
          onClose={onToggleDrawer}
          ModalProps={{ keepMounted: true }}
        >
          {drawerChildren()}
        </NavDrawer>
      </MobileNav>
      <DesktopNav>
        <NavDrawer drawerWidth={drawerWidth} variant="permanent" open>
          {drawerChildren()}
        </NavDrawer>
      </DesktopNav>
    </NavContainer>
  );
};

export { Navigation };
export default Navigation;
