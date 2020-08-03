import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { Button, Fab, Typography, makeStyles } from "@material-ui/core";
import { Publish as PublishIcon } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import clsx from "clsx";

import { uploadVideo } from "../../redux/actions/upload";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    outline: "none",
    transition: "border .24s ease-in-out",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    alignSelf: "center",
    margin: theme.spacing(3),
  },
  uploadBtn: {
    width: 150,
    height: 150,
    backgroundColor: grey[200],
    boxShadow: "none",
  },
  uploadIcon: {
    fontSize: "5em",
    color: grey[500],
  },
  acceptStyle: {
    borderColor: "#00e676",
    color: "green",
  },
  rejectStyle: {
    borderColor: "#ff1744",
    color: "red",
  },
}));

function StyledDropzone() {
  const dispatch = useDispatch();

  const classes = useStyles();
  const onDrop = ([videoFile]) => {
    if (videoFile) {
      dispatch(uploadVideo(videoFile));
    }
  };
  const {
    getRootProps,
    getInputProps,
    open,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: "video/mp4",
    maxSize: 25 * 1024 * 1024,
    onDrop,
  });

  return (
    <div className={classes.root}>
      <div
        {...getRootProps({
          className: clsx(classes.content, {
            [classes.acceptStyle]: isDragAccept,
            [classes.rejectStyle]: isDragReject,
          }),
        })}
      >
        <input {...getInputProps()} />

        <Fab className={clsx(classes.button, classes.uploadBtn)} onClick={open}>
          <PublishIcon className={classes.uploadIcon} />
        </Fab>
        <Typography variant="body1">
          Drag and drop a <strong>.mp4 </strong> file to upload
        </Typography>
        <Typography variant="body2" gutterBottom>
          Your videos will be private until you publish them.
        </Typography>
        <Typography variant="caption" gutterBottom>
          * Video Uploads are limited to 25 MB.
        </Typography>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={open}
        >
          Select File
        </Button>
      </div>
    </div>
  );
}
const VidDropzone = () => {
  const isLoading = useSelector(({ upload }) => upload.isLoading);
  return isLoading ? <div>Loading....</div> : <StyledDropzone />;
};

export default VidDropzone;
