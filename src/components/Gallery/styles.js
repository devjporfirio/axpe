import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  margin: auto;

  .slick-slide {
    width: calc(100vh - 100px);
  }
`;

export const Image = styled.div`
  object-fit: cover;
  background: url(${props => props.url}) center center no-repeat;
  box-sizing: border-box;
  border: 2.5px solid ${({ theme }) => theme.colors.white};
  border-top: none;
  border-bottom: none;

  ${media.greaterThan('769px')`
    height: 525px;
  `}
`;
