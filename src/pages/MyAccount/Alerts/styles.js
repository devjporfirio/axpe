import styled from 'styled-components';
import media from 'styled-media-query';
import MyAccount from '..';
import Button from 'components/Button';

export const Container = styled(MyAccount)``;

export const Body = styled.div`
  padding: 0 20px;

  ${media.greaterThan('medium')`
    padding: 0 60px;
  `}
`;

export const Subtitle = styled.p`
  font: 18px/19px 'Raleway';
  margin-top: 10px;
`;

export const Item = styled.div`
  margin-top: 30px;

  ${media.greaterThan('medium')`
    display:flex;
    align-items: center;

    div:nth-child(2){
      order: 3;
      margin-left: auto;
    }
    div:nth-child(3){
      order: 2;
      margin-left: 28px;
    }
  `}
`;

export const Gradient = styled.div`
  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.0001) 41.21%);
  mix-blend-mode: normal;
  opacity: 0.8;
  border-radius: 6px;
  transform: rotate(-180deg);
`;

export const ItemImage = styled.div`
  background: ${props => `url('/static/${props.background}.png')`} no-repeat;
  width: 100%;
  height: 180px;
  border-radius: 6px;
  object-position: cover;

  ${media.greaterThan('medium')`
    width: 122px;
    height: 122px;
  `}
`;

export const ItemInfo = styled.div``;

export const SourceUse = styled.p`
  text-transform: uppercase;
  font: ${({ theme }) => theme.fontsWeight.bold} 20px/24px 'Raleway';
  padding: 20px 0;

  span:nth-child(1) {
    color: ${({ theme }) => theme.colors.orange};
  }

  ${media.greaterThan('medium')`
    font-size: 20px;
    line-height: 32px;
    padding: 0 0 9px 0;
  `}
`;

export const InfoBase = styled.p`
  font: 18px/20px 'Raleway';

  ${media.greaterThan('medium')`
    font-size: 15px;
    line-height: 20px;
  `}
`;

export const AmountRemoveGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

export const Amount = styled.p`
  font: ${({ theme }) => theme.fontsWeight.semiBold} 12px/19px 'Raleway';
  width: 54px;
  height: 57px;
  border: 1px solid ${({ theme }) => theme.colors.greenDark};
  border-radius: 7px;
  color: ${({ theme }) => theme.colors.greenDark};
  text-align: center;

  strong {
    color: ${({ theme }) => theme.colors.greenDark};
    font: ${({ theme }) => theme.fontsWeight.bold} 26px/35px 'Bitter';
  }

  ${props =>
    props.active &&
    css`
      color: ${({ theme }) => theme.colors.orange};
      strong {
        color: ${({ theme }) => theme.colors.orange};
      }
    `}
`;

export const ButtonRemove = styled(Button)`
  font: ${({ theme }) => theme.fontsWeight.light} 14px/19px 'Raleway';
  color: ${({ theme }) => theme.colors.greenDark};
  text-transform: none;
  background: none;
  display: flex;
  align-items: center;
  height: auto;

  svg {
    width: 21px;
    height: 26px;
    margin-right: 8px;
  }
`;
