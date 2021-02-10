import styled, { css } from 'styled-components';
import media from 'styled-media-query';

// components
import Modals from 'components/Modals';

export const Container = styled(Modals)`
  div[class*='Wrapper'] {
    margin: 0 auto;
    width: 100%;

    h2 {
      text-transform: none;
    }

    ${media.greaterThan('medium')`
      max-width: 320px;
    `}
  }

  button[class*='ButtonClose'] {
    top: 10px;
    right: 10px;

    &:before,
    &:after {
      background: ${({ theme }) => theme.colors.greenDark};

      ${media.greaterThan('medium')`
        height: 20px;
      `}
    }
  }

  div {
    margin: 0 auto;
    max-width: 260px;
    width: 100%;
  }
`;

export const InnerModal = styled.div`

  padding: 30px 0;

  h2 {
    font: 16px/21px 'Raleway';
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

export const ConfirmationText = styled.p`
  font: ${({ theme }) => theme.fontsWeight.medium} 26px/32px 'Bitter';
  max-width: 80%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 20px !important;

  a {
    max-width: calc(50% - 10px);
  }
`;

export const ButtonCommon = css`
  border-width: 1px;
  border-style: solid;
  color: ${({ theme }) => theme.colors.white};
  border-color: ${({ theme }) => theme.colors.orange};
  background: ${({ theme }) => theme.colors.orange};

  height: 45px;
  border-radius: 4px;
  font: 15px/45px 'Raleway';
  font-weight: 600;
  text-align: center;
  text-transform: uppercase

  display: block;
  flex-grow: 1;
`;

export const ButtonSave = styled.a`
  ${ButtonCommon};
`;

export const ButtonCancel = styled.a`
  ${ButtonCommon};

  color: ${({ theme }) => theme.colors.orange};
  background: unset;
`;