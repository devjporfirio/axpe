import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
margin: 30px 0 10px;

p {
  margin-right: 10px;
  font: 18px 'Raleway';

  ${media.greaterThan('medium')`
    font-family: 'Bitter';
    font-size: 17px;
    color: ${({ theme }) => theme.colors.green};
  `}
}
`;

export const ButtonSocial = styled.button`
display: block;
width: 40px;
height: 40px;
margin-left: 20px;

  svg {
    position: relative;
    display: block;
    width: 40px;
    height: 40px;
  }
`;
