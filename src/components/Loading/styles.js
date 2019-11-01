import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  z-index: 101;
  transition: all 300ms ease;

  ${props =>
    props.active ? ({ theme }) => theme.show : ({ theme }) => theme.hide}

  svg {
    display: block;
    width: 83px;
    height: 40px;
    margin: auto;
    transition: all 300ms ease;
  }
`;
