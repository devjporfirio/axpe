import styled from 'styled-components';
import media from 'styled-media-query';
import SVG from 'react-inlinesvg';

// components
import MyAccount from '..';
import BuildingList from 'components/Building/List';

export const Container = styled(MyAccount)``;

export const Body = styled.div``;

export const Amount = styled.div`
  padding: 0 29px 30px 29px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.greaterThan('medium')`
    align-items: flex-end;
  `}
`;

export const ShareIcon = styled(SVG)`
  width: 19.2px;
  height: 24px;
  position: absolute;
  right: 29px;

  ${media.greaterThan('medium')`
    display: none;
  `}
`;

export const GroupIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60px;
`;

export const WhatsIcon = styled(SVG)`
  display: none;

  ${media.greaterThan('medium')`
    display: block;
    width: 23px;
    height: 23px;
  `}
`;

export const MailIcon = styled(SVG)`
  display: none;

  ${media.greaterThan('medium')`
    display: block;
    width: 26px;
    height: 16.71px;
  `}
`;

export const BuildingItem = styled(BuildingList)`
  border: 2px solid ${({ theme }) => theme.colors.grey};
`;
