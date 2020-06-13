import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Fab, Typography } from "@material-ui/core";
import { Publish as PublishIcon } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import clsx from "clsx";

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

function StyledDropzone({ onSuccess }) {
  const classes = useStyles();
  const onDrop = useCallback(([videoFile]) => {
    if (videoFile) {
      console.log(videoFile);
      onSuccess();
    }
  }, []);
  const {
    getRootProps,
    getInputProps,
    open,
    acceptedFiles,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: "video/mp4",
    onDrop,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
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

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={open}
        >
          Select File
        </Button>
      </div>
      {/* <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside> */}
    </div>
  );
}
const VidDropzone = (props) => {
  return <StyledDropzone {...props} />;
};

export default VidDropzone;
