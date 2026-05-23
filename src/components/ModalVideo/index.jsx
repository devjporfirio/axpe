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
        <ModalClose onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6.39989 18.3079L5.69189 17.5999L11.2919 11.9999L5.69189 6.39989L6.39989 5.69189L11.9999 11.2919L17.5999 5.69189L18.3079 6.39989L12.7079 11.9999L18.3079 17.5999L17.5999 18.3079L11.9999 12.7079L6.39989 18.3079Z" fill="#FFFFFF"/>
          </svg>
        </ModalClose>

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