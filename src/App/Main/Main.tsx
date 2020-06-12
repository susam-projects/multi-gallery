import React from "react";
import { Redirect, Route, Switch } from "react-router";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import AddIcon from "@material-ui/icons/Add";
import Layout from "./Layout";
import { NavLink } from "react-router-dom";
import { easing, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import transitions from "@material-ui/core/styles/transitions";

const useStyles = makeStyles(theme => ({
  link: {
    display: "flex",
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.05)",
    },
    fontWeight: "bold",
  },
  activeLink: {
    color: theme.palette.primary.main,
  },
  listItem: {
    cursor: "pointer",
  },
  icon: {
    color: "inherit",
  },
}));

function Main() {
  const styles = useStyles();

  return (
    <Layout
      menu={
        <List component="div">
          <PseudoMenuItem />
          <NavLink to="/first-page" className={styles.link} activeClassName={styles.activeLink}>
            <ListItem className={styles.listItem} component="div">
              <ListItemIcon className={styles.icon}>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="First Page" />
            </ListItem>
          </NavLink>
          <NavLink to="/second-page" className={styles.link} activeClassName={styles.activeLink}>
            <ListItem className={styles.listItem}>
              <ListItemIcon className={styles.icon}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Second Page" />
            </ListItem>
          </NavLink>
        </List>
      }
      page={
        <Switch>
          <Route component={MainPage} path="/" exact />
          <Route component={FirstPage} path="/first-page" exact />
          <Route component={SecondPage} path="/second-page" exact />
          <Redirect to="/" />
        </Switch>
      }
    />
  );
}

interface IPseudoMenuItem {
  onClick?: () => void;
}

const useStyles2 = makeStyles(theme => ({
  pseudoMenuItem: {
    display: "flex",
    width: "100%",
    height: 35,
    color: "rgba(0,0,0,0.12)",
    alignItems: "center",
    justifyContent: "center",
    border: "1px dashed rgba(0,0,0,0.12)",
    borderRadius: "4px",
    borderColor: "currentColor",
    transition: theme.transitions.create("color", { easing: theme.transitions.easing.easeInOut }),
    "&:hover": {
      color: "rgba(0, 0, 0, 0.54)",
    },
  },
}));

const PseudoMenuItem: React.FC<IPseudoMenuItem> = ({ onClick = () => {} }) => {
  const classes = useStyles2();
  return (
    <ListItem component="div" onClick={onClick}>
      <div className={classes.pseudoMenuItem}>
        <AddIcon />
      </div>
    </ListItem>
  );
};

const MainPage: React.FC = () => <div>App</div>;
const FirstPage: React.FC = () => <div>First Page</div>;
const SecondPage: React.FC = () => <div>Second Page</div>;

export default Main;
