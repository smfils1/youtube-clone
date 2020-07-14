import React from "react";

const Thumb = ({
  image,
  href,
  width = "100%",
  height = "200px",
  duration = 0,
}) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration - minutes * 60);
  return (
    <div style={{ position: "relative" }}>
      <a href={href}>
        <img width={width} height={height} alt="thumbnail" src={image} />
        <div
          style={{
            bottom: 0,
            right: 0,
            position: "absolute",
            margin: "10px 8px",
            color: "#fff",
            backgroundColor: "rgba(17, 17, 17, 0.7)",
            padding: "2px 4px",
            borderRadius: "2px",
            letterSpacing: "0.5px",
            fontSize: "12px",
            fontWeight: "700",
            lineHeight: "12px",
          }}
        >
          <span>
            {minutes} : {seconds}
          </span>
        </div>
      </a>
    </div>
  );
};

export default Thumb;
