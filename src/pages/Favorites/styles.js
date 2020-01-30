import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  padding: 20px 10px;
  background-color: ${({ theme }) => theme.colors.greyLight};

  ${media.greaterThan('medium')`
    padding: 0 30px;
  `}
`;
