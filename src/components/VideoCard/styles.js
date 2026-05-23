// styles.js

import styled from 'styled-components';

export const Wrapper = styled.section`
  width: 100%;
  margin: 12px 0;
  border-radius: 8px;
  background: #FFF;
`;

export const VideoThumb = styled.div`
  position: relative;
  aspect-ratio: 1/1;  
  width: 100%;
  height: fit-content;
  overflow: hidden;
  border-radius: 8px;

  iframe {
    aspect-ratio: 1/1;  
    width: 100%;
    height: fit-content;
    display: block;
    border: 0;
  }

  @media (max-width: 768px) {
    aspect-ratio: 1/1;  
    width: 100%;
    height: auto;

    iframe {
      aspect-ratio: 1/1;  
      width: 100%;
      height: auto;
    }
  }
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.2);
`;

export const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 80px;
  transform: translateY(-50%);
  z-index: 3;
`;

export const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 8px;

  h3 {
    color: #EE6900;
    font-family: Raleway;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }

  p {
    color: #434343;
    font-family: Raleway;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 0;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;