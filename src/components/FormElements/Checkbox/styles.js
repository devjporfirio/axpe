import styled from 'styled-components';
import CheckedIconSVG from 'assets/icons/checked.svg';

export const InputCheckbox = styled.input`
  width: 27px;
  height: 27px;
  border: 1.6px solid ${({ theme }) => theme.colors.green};
  border-radius: 4px;
  position: initial;

  &:checked {
    border: 1.6px solid ${({ theme }) => theme.colors.orange};
    background: url(${CheckedIconSVG}) no-repeat;
    background-size: contain;
    background-position: 2px;
  }
`;
