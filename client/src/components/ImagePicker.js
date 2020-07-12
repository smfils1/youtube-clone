import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setThumbnail } from "../redux/actions/upload";

import Image from "./Image";

export default function ImagePicker({ list }) {
  const dispatch = useDispatch();
  const thumbnail = useSelector(({ upload }) => upload.thumbnail);

  return (
    <div>
      {list.map((link, index) => (
        <div key={index}>
          <Image
            src={link}
            onClick={() => {
              dispatch(setThumbnail(link));
            }}
            active={thumbnail && thumbnail === link}
          />
        </div>
      ))}
    </div>
  );
}
