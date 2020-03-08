import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div``;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 460px;
  padding: 50px 30px;
  margin: 0 auto;

  ${media.greaterThan('medium')`
    padding-left: 0;
    padding-right: 0;
  `}
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
