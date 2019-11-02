import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  .slider {
    width: 100%;
    height: 12px;

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 1px;
      background: ${({ theme }) => theme.colors.orange};
      opacity: 0.4;
    }
  }

  .thumb {
    display: block;
    top: 50%;
    width: 24px;
    height: 24px;
    font-size: 0;
    z-index: 3;
    transform: translateY(-50%);

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      width: 12px;
      height: 12px;
      background: ${({ theme }) => theme.colors.orange};
      border-radius: 50%;
      transform: translateY(-50%);
    }

    &.thumb-0 {
      &:before {
        left: 0;
      }
    }

    &.thumb-1 {
      &:before {
        right: 0;
      }
    }
  }

  .track-1 {
    display: block;
    top: 50%;
    height: 1px;
    background: ${({ theme }) => theme.colors.orange};
    z-index: 2;
  }
`;

export const Text = styled.p`
  margin-bottom: 10px;
  text-align: center;
  font: 18px 'Raleway';
  color: ${({ theme }) => theme.colors.green};
`;
