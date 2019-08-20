import React from "react";
import "./ActorImage.scss";
import ImageZoom from "react-medium-image-zoom";
import Zoom from "react-reveal/Zoom";

const ActorImage = ({ img_path }) => {
  const base_url = "https://image.tmdb.org/t/p/w185";
  const base_url2 = "https://image.tmdb.org/t/p/original";

  return (
    <div className="actor-card">
      <Zoom>
      <div
        className="img-wrapper"
      >
        <ImageZoom
          image={{
            src: `${base_url + img_path}`,
            alt: "actor profile image small",
            className: "actor-img-profile"
          }}
          zoomImage={{
            src: `${base_url2 + img_path}`,
            alt: "actor profile image original"
          }}
        />
      </div>
      </Zoom>
    </div>
  );
};

export default ActorImage;
