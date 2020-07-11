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
import {
  Wifi as LiveIcon,
  LiveTv as TVIcon,
  VideoCall as VideoIcon,
} from "@material-ui/icons";
import { logoutUser } from "../../redux/actions/user";
import NavItem from "../NavItem";
import UploadModal from "../Upload/UploadModal";
const useStyles = makeStyles((theme) => ({
  iconButton: {
    "&:hover": {
      backgroundColor: "white",
    },
    "&:focus": {
      outline: "white",
    },
    // padding: 0,
  },
}));

const NavVideoMenuBtn = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openUpload, setOpenUpload] = React.useState(false);
  const anchorBtnRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorBtnRef.current && anchorBtnRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handUploadClick = (event) => {
    handleToggle();
    setOpenUpload((prevOpen) => !prevOpen);
  };

  const handUploadClose = (event) => {
    setOpenUpload(false);
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
        ref={anchorBtnRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        className={classes.iconButton}
        onClick={handleToggle}
      >
        <VideoIcon />
      </IconButton>
      {openUpload && (
        <UploadModal isOpen={openUpload} handUploadClose={handUploadClose} />
      )}
      (
      <Popper
        open={open}
        anchorEl={anchorBtnRef.current}
        role={undefined}
        transition
        disablePortal
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              autoFocusItem={open}
              id="menu-list-grow"
              onKeyDown={handleListKeyDown}
            >
              <List component="nav" aria-labelledby="nested-list-subheader">
                <NavItem
                  title="Upload"
                  icon={TVIcon}
                  onClick={handUploadClick}
                />
                <NavItem
                  to="#"
                  title="Go live"
                  icon={LiveIcon}
                  onClick={handleClose}
                />
              </List>
              <Divider />
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
      )}
    </>
  );
};

export default NavVideoMenuBtn;
