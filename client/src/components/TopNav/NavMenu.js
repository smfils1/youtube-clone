import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Tooltip,
  Avatar,
  Grid,
  Typography,
  List,
  Menu,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { ExitToApp as ExitToAppIcon } from "@material-ui/icons";
import { setMobileSearch } from "../../redux/actions/layout";
import { logoutUser } from "../../redux/actions/user";
import SignInBtn from "../SignInBtn";
import { BACKEND_URL } from "../../config";
const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingLeft: "0px",
  },
  iconButton: {
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "white",
    },
    "&:focus": {
      outline: "white",
    },
  },
}));

const NavMenu = ({ open, anchorEl, onClose }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(({ user }) => user.isAuth);
  const profileImg = useSelector(({ user }) => user.profileImg);
  const name = useSelector(({ user }) => user.name);
  const email = useSelector(({ user }) => user.email);
  console.log(profileImg);
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Menu
      id="nav-menu"
      anchorEl={anchorEl}
      open={isAuth && Boolean(anchorEl)}
      onClose={onClose}
    >
      <Grid
        container
        spacing={1}
        alignItems="center"
        wrap="nowrap"
        style={{ padding: "12px 24px" }}
      >
        <Grid item>
          <Avatar alt="Profile Image" src={profileImg} size="large" />
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body2">
                <Tooltip title="Title" placement="right-start">
                  <strong>{name}</strong>
                </Tooltip>
              </Typography>
            </Grid>{" "}
            <Grid item xs={12}>
              <Typography variant="body2">{email}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider />
      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItem button onClick={() => dispatch(logoutUser())}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText
            primary="Sign Out"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </ListItem>
      </List>
      <Divider />
    </Menu>
  );
};

export default NavMenu;
