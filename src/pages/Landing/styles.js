import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import Button from 'components/Button';
import SlickSection from 'components/SlickSection';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.greyLight3};
  padding-bottom: 20px;

  hr {
    width: 113px;
    margin: auto;
  }
`;

export const Image = styled.img`
  ${props =>
    props.mq == 'mobile' && media.greaterThan('medium')`display: none;`};
  ${props => props.mq == 'desktop' && media.lessThan('medium')`display: none;`};
  height: 275px;
  width: 100%;
  object-fit: cover;

  ${media.greaterThan('medium')`
    height: 512px;
  `}
`;

export const Gradient = styled.div`
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.0001) 25.36%,
    #000000 97.86%
  );
  height: 275px;
  width: 100%;
  position: absolute;

  ${media.greaterThan('medium')`
    width: calc(100% - 200px);
    height: 512px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 25.36%, #000000 97.86%);
  `}
`;

export const Title = styled.h1`
  text-align: center;
  width: 235px;
  font: 24px/37px 'Bitter';
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  color: ${({ theme }) => theme.colors.greenDark};
  margin: 24px auto 15px auto;

  ${media.greaterThan('medium')`
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
    font-size: 45px;
    line-height: 55px;
    width: 460px;
  `}
`;

export const Text = styled.p`
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  font: 18px/21px 'Raleway';
  text-align: left;
  display: block;
  overflow: hidden;
  position: relative;
  padding: 30px;

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    content: '';
    background: linear-gradient(
      180deg,
      rgba(245, 245, 240, 0.0001) 1.3%,
      #f5f5f0 81.49%
    );
    pointer-events: none;

    ${props =>
      props.transparent &&
      css`
        background: transparent;
      `};
  }

  ${media.greaterThan('medium')`
    background: transparent;
    max-width: 1000px;
    margin: auto;
    text-align: center;
    line-height: 25px;

    &:after{
      background: none;
    }
  `}
`;

export const SeeMore = styled(Button)`
  background-color: ${({ theme }) => theme.colors.greyLight3};
  border: 1.57px solid ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.orange};
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  font: 13.5px 'Raleway';
  height: 32px;
  margin: -50px auto 0 auto;
  position: absolute;
  left: 50%;
  margin-left: -50px;

  ${media.greaterThan('medium')`
    display: none;
  `}
`;

export const GroupText = styled.article`
  text-align: center;
`;

export const Banner = styled.div`
  img {
    padding: 15px;
    height: 451px;
  }

  ${media.greaterThan('medium')`
    img {
      margin: auto;
      max-width: 1000px;
    }
  `}
`;

export const TitleModule = styled.h2`
  padding: 0 30px 10px 30px;
  font: 22px/28px 'Bitter';
  font-weight: ${({ theme }) => theme.fontsWeight.bold};

  strong {
    color: ${({ theme }) => theme.colors.orange};
  }

  ${media.greaterThan('medium')`
    font-size: 41px;
    font-weight: ${({ theme }) => theme.fontsWeight.regular};
    line-height: 40px;
    max-width: 560px;
  `}
`;

export const TextModule = styled.p`
  padding: 0 30px 10px 30px;
  font: 18px/22px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.regular};

  ${media.greaterThan('medium')`
    line-height: 25px;
  `}
`;

export const Link = styled(Button)`
  height: 40px;
  line-height: 40px;
  position: absolute;
  margin-top: -145px;
  margin-left: 40px;

  ${media.greaterThan('medium')`
    margin-left: 15%;
  `}
`;

export const Module = styled.div`
  ${media.greaterThan('medium')`
    max-width: 1000px;
    margin: auto;
  `}
`;

export const SlideSmall = styled(SlickSection)`
  margin: 30px;

  a {
    display: none;
  }
`;
