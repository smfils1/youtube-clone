import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import VidDropzone from "./VidDropzone";

import UploadStepper from "./UploadStepper";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function CustomizedDialogs({ isOpen, handleClose }) {
  const filename = useSelector(({ upload }) => upload.filename);

  //const [open, setOpen] = React.useState(isOpen);
  //const [filename, setFilename] = React.useState("");
  //const [openStepper, setOpenStepper] = React.useState(false);

  // const handleClose = () => {
  //   setOpen(false);
  //   handUploadClose();
  // };

  // const loadStepper = (filename) => {
  //   setOpenStepper(true);
  //   setFilename(filename);
  // };

  const onVideoUploadSuccess = () => {};

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Upload video
      </DialogTitle>
      <DialogContent dividers>
        {filename ? <UploadStepper filename={filename} /> : <VidDropzone />}
      </DialogContent>
    </Dialog>
  );
}
