import styled from 'styled-components';
import media from 'styled-media-query';

export const ButtonFloat = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 70px;
  right: 50px;
  width: 50px;
  height: 50px;
  font-size: 0;
  background: ${({ theme }) => theme.colors.orange};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.white};

  ${media.greaterThan('medium')`
    border-width: 2px;
    width: 70px;
    height: 70px;
  `}

  ${media.greaterThan('large')`
    transition: all 300ms ease;

    &:hover {
      transform: scale(1.05);
      transition-duration: 200ms;
    }
  `}

  svg {
    display: block;
    width: 30px;
    height: 30px;
  }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(38, 50, 56, 0.8);
  z-index: 105;
`;

export const Wrapper = styled.div``;
