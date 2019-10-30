import styled from 'styled-components';
import media from 'styled-media-query';
import Button from 'components/Button';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.green};
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  min-height: 268px;
  padding: 30px;

  div {
    width: 315px;
    margin-top: 24px;

    p {
      max-width: 240px;
      font: 18px/21px 'RalewayRegular';
      color: ${({ theme }) => theme.colors.white};
      margin-bottom: 24px;
    }
  }

  ${media.greaterThan('769px')`
    justify-content: space-around;
    flex-direction: row;

    div {
      width: 240px;
    }
  `}
`;

export const Link = styled(Button)`
  background-color: ${props => props.theme.colors[props.color]};
  color: ${props => props.theme.colors.white};
  width: 240px;
  height: 45px;
  border-radius: 6px;
  display: block;
`;

export const Highlighted = styled.p`
  font: 40px/47px 'RalewayBlack';
  text-align: left;
  color: ${({ theme }) => theme.colors.white};
  width: 315px;
`;
