import styled from 'styled-components';
import media from 'styled-media-query';

export const FormContainer = styled.form`
  padding-bottom: 30px;

  ${media.greaterThan('768px')`
    display: block;
  `}
`;
