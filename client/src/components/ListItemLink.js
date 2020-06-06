import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red, grey } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: grey[300],
    "&:hover": { backgroundColor: grey[400] },
  },
  icon: {
    padding: theme.spacing(0, 1),
  },
  iconActive: {
    color: red[600],
  },
  text: {
    color: "inherit" /* blue colors for links too */,
    textDecoration: "none" /* no underline */,
    "&:hover": {
      color: "inherit" /* blue colors for links too */,
      textDecoration: "none" /* no underline */,
    },
  },
}));

const ListItemLink = ({ children, to, title, icon }) => {
  const classes = useStyles();
  const location = useLocation();
  const isActive = location.pathname === to;
  const Icon = icon;
  return (
    <Tooltip title={title}>
      <NavLink to={to} className={classes.text}>
        <ListItem button className={isActive ? classes.active : ""}>
          <ListItemIcon
            className={clsx(classes.icon, {
              [classes.iconActive]: isActive,
            })}
          >
            <Icon />
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
      </NavLink>
    </Tooltip>
  );
};

export default ListItemLink;
