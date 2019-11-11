import styled, { css } from 'styled-components';
import media from 'styled-media-query';

// assests
import CheckedIconSVG from 'assets/icons/checked.svg';
import ArrowIconSVG from 'assets/icons/arrow.svg';

export const Container = styled.section`
  position: fixed;
  top: 0;
  left: 100%;
  display: block;
  width: 100%;
  height: 100%;
  z-index: 105;
  background: ${({ theme }) => theme.colors.green};
  transition: all 300ms ease;

  ${({ theme }) => theme.hide};

  ${props => props.active && ContainerActive}

  ${media.greaterThan('medium')`
    left: 200px;
    width: calc(100% - 200px);
    background: rgba(38, 50, 56, 0.8);
    z-index: 99;
  `};
`;

export const ContainerActive = css`
  left: 0%;

  ${({ theme }) => theme.show};
`;

export const Form = styled.form`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;

  ${media.greaterThan('medium')`
    overflow: visible;
    cursor: pointer;
  `};
`;

export const FormWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 30px;
  padding-bottom: 0;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  ${media.greaterThan('medium')`
    position: absolute;
    top: 0;
    width: 360px;
    height: 100vh;
    padding: 80px 30px 0 30px;
    background: ${({ theme }) => theme.colors.green};
    transform: translateX(-100%);
    overflow: hidden;
    overflow-y: auto;
    z-index: 5;
    transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1.000);
    cursor: default;

    ${props =>
      props.active &&
      `
      transform: translateX(0%);
      transition-duration: 300ms;
    `}
  `};
`;

export const FormClose = styled.button`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  width: 15px;
  height: 15px;
  font-size: 0;

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1px;
    height: 15px;
    background: ${({ theme }) => theme.colors.white};
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export const FormHeader = styled.header`
  position: relative;
  width: 100%;
  padding-top: 10px;

  ${media.greaterThan('medium')`
    padding-top: 0;
  `}
`;

export const FormHeaderTitle = styled.h2`
  margin-bottom: 20px;
  font: 22px 'Raleway';
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};

  ${media.greaterThan('medium')`
    font-size: 16px;
  `}
`;

export const FormGroup = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 10px;

  ${props => props.type === 'reference' && FormGroupReference}
`;

export const FormGroupReference = css`
  input {
    padding-right: 50px;
  }

  svg {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    width: 11px;
    height: 14px;
    transform: translateY(-50%);
    pointer-events: none;

    & > g {
      stroke-width: 2px;
    }
  }
`;

export const FormButtonsFilter = styled.div`
  width: 100%;
  margin: 10px 0 0 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyDark};

  ${media.greaterThan('medium')`
    border-bottom: 0;
    margin-bottom: 10px;
  `}
`;

export const FormButtonsFilterTitle = styled.h3`
  margin-bottom: 10px;
  text-transform: uppercase;
  font: 16px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  color: ${({ theme }) => theme.colors.white};
`;

export const FormButtonsFilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 20px;

  ${media.greaterThan('medium')`
    margin-bottom: 10px;
  `}
`;

export const FormButtonsFilterItemRadio = styled.label`
  display: block;
  width: 100%;
  position: relative;
  margin-bottom: 5px;
  cursor: pointer;

  &:before {
    content: 'OU';
    display: none;
    position: absolute;
    top: 50%;
    left: -40px;
    width: 40px;
    text-align: center;
    font: 12px 'Raleway';
    color: ${({ theme }) => theme.colors.white};
    transform: translateY(-50%);
  }

  input {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    z-index: 2;
    cursor: pointer;
    opacity: 0;

    &:checked ~ span {
      background: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.green};
    }
  }

  span {
    display: block;
    width: 100%;
    height: 40px;
    text-align: center;
    font: 14px/36px 'Raleway';
    text-transform: uppercase;
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
    color: ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.white};
    border-radius: 3px;
    transition: all 300ms ease;
  }

  ${props =>
    props.twoColumns &&
    `
    width: calc(50% - 20px);

    &:last-child {
      margin-left: 40px;

      &:before {
        display: block;
      }
    }
  `}

  ${media.greaterThan('1024px')`
    &:hover {
      span {
        background: ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors.green};
      }
    }
  `}
`;

export const FormButtonFilter = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 60px;
  min-height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyDark};
  font: 12px 'Raleway';

  span,
  strong {
    width: 100%;
    padding-right: 30px;
    text-align: left;
    color: ${({ theme }) => theme.colors.white};
  }

  strong {
    text-transform: uppercase;
    font-size: 17px;
    letter-spacing: 0.5px;
    font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
    transition: all 300ms ease;
  }

  span {
    margin-top: 2px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0.5px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  svg {
    display: block;
    position: absolute;
    top: 50%;
    right: 0;
    width: 24px;
    min-width: 24px;
    height: 24px;
    transform: translateY(-50%);

    rect {
      fill: ${({ theme }) => theme.colors.white};
    }
  }

  ${props => props.active && FormButtonFilterActive}

  ${media.greaterThan('medium')`
    display: block;
    border-bottom: 0;
    padding: 5px 0;
    margin-bottom: 10px;
    height: auto;
    min-height: 30px;
    text-align: left;

    &:last-of-type {
      margin-bottom: 0;
    }

    strong {
      display: block;
      width: 100%;
      font-size: 16px;
    }

    span {
      margin-top: 5px;

      &:before {
        display: inline-block;
        content: 'Selecionado(s):';
        margin-right: 5px;
      }
    }
  `}
`;

export const FormButtonFilterActive = css`
  strong {
    color: ${({ theme }) => theme.colors.orange};
  }
`;

export const FormTab = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100vh;
  padding: 50px 30px 0 80px;
  overflow: hidden;
  overflow-y: auto;
  z-index: 5;
  background: ${({ theme }) => theme.colors.white};
  transition: all 300ms ease;

  ${media.greaterThan('medium')`
    left: 0;
    padding: 80px 30px 30px;
    width: 250px;
    z-index: 3;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1.000);
    cursor: default;
    ${({ theme }) => theme.hide}
  `}

  ${props => props.active && FormTabActive}
`;

export const FormTabActive = css`
  left: 0%;

  & > button:first-child {
    left: 0%;
  }

  ${media.greaterThan('medium')`
    left: 360px;
    ${({ theme }) => theme.show}
  `}
`;

export const FormTabButtonBack = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 100%;
  width: 50px;
  height: 100%;
  font-size: 0;
  background: ${({ theme }) => theme.colors.green};
  transition: all 300ms ease;

  ${media.greaterThan('medium')`
    display: none;
  `}

  svg {
    display: block;
    width: 24px;
    height: 24px;
    transform: rotate(180deg);

    rect {
      fill: ${({ theme }) => theme.colors.white};
    }
  }
`;

export const FormTabClose = styled.button`
  display: none;
  position: absolute;
  top: 30px;
  right: 30px;
  width: 30px;
  height: 30px;
  font-size: 0;

  ${media.greaterThan('medium')`
    display: block;
  `};

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 30px;
    background: ${({ theme }) => theme.colors.green};
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export const FormTabTitle = styled.h3`
  margin-bottom: 30px;
  font: 18px 'Raleway';
  letter-spacing: 1px;
  font-weight: ${({ theme }) => theme.fontsWeight.bold};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.green};

  ${media.greaterThan('medium')`
    font-size: 16px;
  `}
`;

export const FormTabContent = styled.div`
  padding-bottom: 50px;

  ul {
    ul {
      margin-bottom: 25px;
    }
  }

  li {
    margin-bottom: 10px;
  }
`;

export const FormTabListItemTitle = styled.h4`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font: 18px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.green};

  &:after {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    margin-left: auto;
    background: url(${ArrowIconSVG}) no-repeat;
    background-size: contain;
    transform: rotate(90deg);
  }

  ${media.greaterThan('medium')`
    font-size: 13px;
  `}
`;

export const FormTabListItemButton = styled.button`
  position: relative;
  display: block;
  width: 100%;
  padding-right: 30px;
  text-align: left;
  font: 18px 'Raleway';
  color: ${({ theme }) => theme.colors.green};
  transition: all 300ms ease;

  ${props => props.active && FormTabListItemButtonActive}

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    right: 0;
    width: 22px;
    height: 22px;
    background: url(${CheckedIconSVG}) no-repeat;
    background-size: contain;
    transform: translateY(-50%);
    transition: all 300ms ease;
    ${({ theme }) => theme.hide};
  }

  ${media.greaterThan('medium')`
    font-size: 13px;
  `}

  ${media.greaterThan('1024px')`
    &:hover {
      color: ${({ theme }) => theme.colors.orange};
    }
  `};
`;

export const FormTabListItemButtonActive = css`
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  color: ${({ theme }) => theme.colors.orange};

  &:before {
    ${({ theme }) => theme.show};
  }
`;

export const FormTabSlider = styled.div`
  width: 100%;
  margin-bottom: 30px;

  & > div {
    touch-action: none;
  }
`;

export const FormTabSliderTitle = styled.h4`
  font: 18px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.green};

  ${media.greaterThan('medium')`
    font-size: 13px;
  `};
`;

export const FormFooter = styled.footer`
  display: flex;
  flex-wrap: wrap;
  margin-top: auto;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
`;

export const FormButtonSubmit = styled.button`
  display: block;
  width: 100%;
  height: 48px;
  margin-bottom: 30px;
  font: 20px/48px 'Raleway';
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontsWeight.medium};
  text-align: center;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.orange};

  &[disabled] {
    opacity: 0.2;
    cursor: default;
  }
`;

export const FormAlert = styled.div`
  position: relative;
`;

export const FormAlertTooltip = styled.div`
  display: block;
  position: absolute;
  top: -80px;
  left: -8px;
  width: 210px;
  padding: 15px;
  font: 12px/15px 'Raleway';
  background: ${({ theme }) => theme.colors.yellowLight};
  border-radius: 1px;
  transition: all 300ms ease;
  ${({ theme }) => theme.hide}

  ${props => props.active && FormAlertTooltipActive}

  &:before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 10px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid ${({ theme }) => theme.colors.yellowLight};
  }

  p {
    font-size: 12px;
  }

  strong {
    display: block;
    font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  }
`;

export const FormAlertTooltipActive = css`
  top: -90px;
  ${({ theme }) => theme.show}
`;

export const FormButtonAlert = styled.button`
  display: flex;
  align-items: center;
  font: 15px 'Raleway';
  text-decoration: underline;
  text-transform: lowercase;
  color: ${({ theme }) => theme.colors.white};
  transition: all 300ms ease;

  svg {
    display: block;
    margin-right: 10px;
    width: 24px;
    min-width: 24px;
    height: 23px;

    path {
      fill: ${({ theme }) => theme.colors.white};
      transition: all 300ms ease;
    }
  }

  &[disabled] {
    opacity: 0.2;
    cursor: default;
  }

  ${media.greaterThan('medium')`
    font-size: 12px;

    svg {
      width: 18px;
      min-width: 18px;
      height: 18px;
    }
  `};

  ${media.greaterThan('1024px')`
    &:not([disabled]):hover {
      color: ${({ theme }) => theme.colors.orange};

      svg path {
        fill: ${({ theme }) => theme.colors.orange};
      }
    }
  `}

  ${props => props.active && FormButtonAlertActive}
`;

export const FormButtonAlertActive = css`
  svg path {
    fill: ${({ theme }) => theme.colors.orange};
  }
`;

export const FormButtonClear = styled.button`
  display: block;
  margin-left: auto;
  font: 14px 'Raleway';
  text-decoration: underline;
  text-transform: lowercase;
  color: ${({ theme }) => theme.colors.white};
  transition: all 300ms ease;

  &[disabled] {
    opacity: 0.2;
    cursor: default;
  }

  ${media.greaterThan('medium')`
    font-size: 12px;
  `};

  ${media.greaterThan('1024px')`
    &:not([disabled]):hover {
      color: ${({ theme }) => theme.colors.orange};
    }
  `}
`;
