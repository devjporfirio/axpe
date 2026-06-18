// styles.js

import styled from "styled-components";

/* =========================================
   MODAL
========================================= */

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.82);
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 24px;
`;

export const ModalContainer = styled.div`
  position: relative;
  width: 100%;
  
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  width: 732px;
  height: 461px;
  max-width: 1100px;
  aspect-ratio: 732/461;
  
  @media (max-width: 768px) {
    aspect-ratio: 9 / 16;
  }
`;

export const ModalIframe = styled.iframe`
  width: 100%;
  height: 100%;
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;

  scale: .75;

  width: 42px;
  height: 42px;

  border-radius: 50%;
  border: 0;

  background: rgba(255, 255, 255, 0.15);
  color: #fff;

  font-size: 28px;
  cursor: pointer;

  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  backdrop-filter: blur(6px);

  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;