import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";

import { setThumbnail } from "../redux/actions/upload";
import Image from "./Image";

const useStyles = makeStyles((theme) => ({
  root: { display: "flex", flexWrap: "wrap", justifyContent: "center" },
  button: {
    marginRight: theme.spacing(1),
  },
  img: {
    margin: theme.spacing(1),
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  picker: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

export default function ImagePicker({ list }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const thumbnail = useSelector(({ upload }) => upload.thumbnailFilename);
  return (
    <div className={classes.root}>
      {list.map(({ link, filename }, index) => (
        <div key={index} className={classes.img}>
          <Image
            src={link}
            onClick={() => {
              dispatch(setThumbnail(filename));
            }}
            active={thumbnail && thumbnail === filename}
          />
        </div>
      ))}
    </div>
  );
}
