import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Tooltip,
  Avatar,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ClickAwayListener,
  IconButton,
  Paper,
  MenuList,
  Popper,
} from "@material-ui/core";
import { ExitToApp as ExitToAppIcon } from "@material-ui/icons";
import { logoutUser } from "../../redux/actions/user";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    "&:hover": {
      backgroundColor: "white",
    },
    "&:focus": {
      outline: "white",
    },
    padding: 0,
  },
}));

const TooltipHeader = ({ text, children }) => (
  <Tooltip title={text} placement="right">
    <div
      style={{
        width: "200px",
      }}
    >
      <span>
        <Typography variant="body2" noWrap>
          {children || text}
        </Typography>
      </span>
    </div>
  </Tooltip>
);

const NavMenuBtn = () => {
  const dispatch = useDispatch();
  const profileImg = useSelector(({ user }) => user.profileImg);
  const name = useSelector(({ user }) => user.name);
  const email = useSelector(({ user }) => user.email);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.iconButton}
      >
        <Avatar alt="Profile Image" src={profileImg} />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              autoFocusItem={open}
              style={{ width: "350px" }}
              id="menu-list-grow"
              onKeyDown={handleListKeyDown}
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
                  <Grid container style={{ overflow: "hidden" }}>
                    <Grid item xs={12}>
                      <TooltipHeader text={name}>
                        <strong>{name}</strong>
                      </TooltipHeader>
                    </Grid>{" "}
                    <Grid item>
                      <TooltipHeader text={email}>{email}</TooltipHeader>
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
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
};

export default NavMenuBtn;
