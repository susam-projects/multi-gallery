import React, { useState } from "react";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  fade,
  Hidden,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { ICollectionViewerRouteParams } from "../CollectionViewer";

export interface ILayoutProps {
  menu: React.ReactNode;
  page: React.ReactNode;
}

const DRAWER_WIDTH = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    marginLeft: 12,
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: 12,
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
  drawerWrapper: {
    display: "flex",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  logo: {
    ...theme.mixins.toolbar,
    ...theme.mixins.gutters,
    display: "flex",
    alignItems: "center",
    marginLeft: 16,
    color: "#0000008A",
    textDecoration: "none",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  buttonLink: {
    color: "inherit",
  },
}));

const Layout: React.FC<ILayoutProps> = ({ menu, page }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  function handleDrawerOpen() {
    setIsOpen(true);
  }
  function handleDrawerClose() {
    setIsOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Hidden mdUp>
        <Header showMenuIcon onMenuIconClick={handleDrawerOpen} />
        <NarrowScreenDrawer menu={menu} onClose={handleDrawerClose} isOpen={isOpen} />
      </Hidden>

      <Hidden smDown>
        <Header useDrawerPadding />
        <WideScreenDrawer menu={menu} />
      </Hidden>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {page}
      </main>
    </div>
  );
};

interface IHeaderProps {
  useDrawerPadding?: boolean;
  showMenuIcon?: boolean;
  onMenuIconClick?: () => void;
}

function Header({
  useDrawerPadding = false,
  showMenuIcon = false,
  onMenuIconClick = () => {},
}: IHeaderProps) {
  const match = useRouteMatch<ICollectionViewerRouteParams>("/collections/view/:slug");
  const slug = match?.params?.slug;

  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={classNames(classes.appBar, useDrawerPadding && classes.appBarShift)}
    >
      <Toolbar>
        {showMenuIcon && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuIconClick}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Link to={`/collections/edit/${slug}`} className={classes.buttonLink}>
          <IconButton color="inherit">
            <EditIcon />
          </IconButton>
        </Link>
        <Typography component="h1" variant="h6" color="inherit" className={classes.title}>
          Page Title
        </Typography>
        <div className={classes.search}>
          <div className={classNames(classes.searchIcon)}>
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
        <Link to="/settings" className={classes.buttonLink}>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

interface IDrawerProps {
  menu: React.ReactNode;
}

const WideScreenDrawer: React.FC<IDrawerProps> = ({ menu }) => {
  const classes = useStyles();
  return (
    <nav className={classes.drawerWrapper}>
      <Drawer
        variant="permanent"
        open={true}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Link to="/" className={classes.logo}>
          <Typography variant="h6" color="inherit">
            Multi Gallery
          </Typography>
        </Link>
        <Divider />
        {menu}
      </Drawer>
    </nav>
  );
};

interface INarrowScreenDrawerProps extends IDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NarrowScreenDrawer: React.FC<INarrowScreenDrawerProps> = ({ menu, isOpen, onClose }) => {
  const classes = useStyles();

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <nav className={classes.drawerWrapper}>
      <Drawer
        container={container}
        variant="temporary"
        anchor="left"
        open={isOpen}
        onClose={onClose}
        classes={{
          paper: classNames({
            [classes.drawerPaper]: true,
          }),
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Link to="/" className={classes.logo}>
          <Typography variant="h6" color="inherit">
            Multi Gallery
          </Typography>
        </Link>
        <Divider />
        {menu}
      </Drawer>
    </nav>
  );
};

export default Layout;
