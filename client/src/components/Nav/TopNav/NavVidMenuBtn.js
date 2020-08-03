import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
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
import urlJoin from "url-join";

import { setModal, resetUpload } from "../../../redux/actions/upload";
import { BACKEND_URL } from "../../../config";
import NavItem from "../NavItem";
import UploadModal from "../../Upload/UploadModal";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    "&:hover": {
      backgroundColor: "white",
    },
    "&:focus": {
      outline: "white",
    },
  },
}));

const NavVideoMenuBtn = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(({ upload }) => upload.isOpen);
  const isAuth = useSelector(({ channel }) => channel.isAuth);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
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

  const handleUploadClick = () => {
    handleToggle();
    if (isAuth) {
      dispatch(setModal(true));
    } else {
      window.location.assign(urlJoin(BACKEND_URL, "/api/auth/google"));
    }
  };

  const handleModalClose = (event) => {
    dispatch(setModal(false));
    //  dispatch(resetUpload());
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
      {isModalOpen && (
        <UploadModal isOpen={isModalOpen} handleClose={handleModalClose} />
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
                  onClick={handleUploadClick}
                />
                <NavItem
                  to="/live"
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
