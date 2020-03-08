import styled from 'styled-components';
// import media from 'styled-media-query';

export const FormContainer = styled.form`
  margin-top: 17px;

  label {
    height: 40px;
    background-color: ${({ theme }) => theme.colors.grey};
    margin-bottom: 14px;
  }
`;