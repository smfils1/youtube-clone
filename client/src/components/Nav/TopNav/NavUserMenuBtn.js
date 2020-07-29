import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import NavItem from "../NavItem";
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
import { logoutChannel } from "../../../redux/actions/channel";

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

const NavUserMenuBtn = () => {
  const dispatch = useDispatch();
  const image = useSelector(({ channel }) => channel.image);
  const name = useSelector(({ channel }) => channel.name);
  const email = useSelector(({ channel }) => channel.email);
  const id = useSelector(({ channel }) => channel.id);
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
        <Avatar alt="Channel Image" src={image} />
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
                  <Avatar alt="Profile Image" src={image} size="large" />
                </Grid>
                <Grid item>
                  <Grid container style={{ overflow: "hidden" }}>
                    <Grid item xs={12}>
                      <strong>{name}</strong>
                    </Grid>{" "}
                    <Grid item>{email}</Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
              <List component="nav" aria-labelledby="nested-list-subheader">
                <NavItem
                  to={`/channel/${id}`}
                  title={"Your Channel"}
                  icon={ExitToAppIcon}
                  onClick={handleClose}
                />

                <NavItem
                  title={"Sign Out"}
                  icon={ExitToAppIcon}
                  onClick={(e) => {
                    handleClose(e);
                    dispatch(logoutChannel());
                  }}
                />
              </List>
              <Divider />
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
};

export default NavUserMenuBtn;
