// ModalVideo.jsx

import React from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalClose,
  ModalIframe,
} from "./styles";

const ModalVideo = ({ open, onClose, videoId }) => {
  if (!open) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalClose onClick={onClose}>×</ModalClose>

        <ModalIframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&disablekb=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ModalVideo;