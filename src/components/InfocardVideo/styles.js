// styles.js

import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100%;
  margin: 40px 0 0;
`;

export const VideoThumb = styled.div`
  position: relative;
  width: 100%;
  height: 517px;
  overflow: hidden;
  border-radius: 8px;

  img,
  iframe {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 768px) {
    aspect-ratio: 375 / 732;
    width: 100%;
    height: auto;

    iframe {
      aspect-ratio: 375 / 732;
      width: 100%;
      height: auto;
    }
  }
`;

export const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  transition: all 0.3s ease;
  pointer-events: none;

  background: rgba(0, 0, 0, 0.35);

  &.active {
    background: rgba(0, 0, 0, 0.35);
  }
`;
export const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 80px;
  transform: translateY(-50%);
  z-index: 3;
  max-width: 320px;
  color: #fff;
  opacity: 1;
  visibility: visible;
  transition: all 0.3s ease;

  h2 {
    color: #FFF;
    font-family: Bitter;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
  }

  p {
    color: #FFF;
    font-family: Raleway;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 8px 0 20px;
  }

  a {
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
    border-radius: 4px;
    background: #EE6900;
    border: 0;
    padding: 14px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    top: 70%;
    left: 24px;
    right: 24px;
    max-width: 100%;

    h2 {
      font-size: 34px;
      margin-bottom: 16px;
    }

    p {
      display: none;
    }
  }
`;

export const PlayButton = styled.a`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 0;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  color: #fff;
  font-size: 34px;
  cursor: pointer;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    font-size: 28px;
  }
`;