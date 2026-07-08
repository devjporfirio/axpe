import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  max-width: 974px;
  margin: 0 auto 60px;
  padding: 0 15px;

  ${media.greaterThan('large')`
    padding: 0;
  `}
`;

export const Title = styled.h2`
  font-size: 20px;
  margin: 0 0 16px;

  ${media.greaterThan('medium')`
    font-size: 26px;
    margin-bottom: 20px;
  `}
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;

  ${media.greaterThan('medium')`
    margin-bottom: 20px;
  `}
`;

export const Chip = styled.button`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 12px;
  border-radius: 15px;
  border: 1px solid ${({ isActive }) => (isActive ? '#1a73e8' : '#d9d9d9')};
  background-color: ${({ isActive }) => (isActive ? '#e8f0fe' : '#fff')};
  color: ${({ isActive }) => (isActive ? '#1a73e8' : '#555')};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
    margin-right: 6px;
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 260px;
  background-color: #143643;
  overflow: hidden;
  position: relative;
  border-radius: 8px;

  ${media.greaterThan('medium')`
    height: 420px;
  `}
`;

export const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const FullscreenButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  width: 32px;
  height: 32px;
  background: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  color: #333;
`;
