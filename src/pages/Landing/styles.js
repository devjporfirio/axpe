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

  ${media.greaterThan('medium')`
    padding-bottom: 0;
  `}
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
    margin-bottom: 40px;
  `}
`;

export const GroupText = styled.article`
  position: relative;
  text-align: center;
`;

export const Text = styled.p`
  display: block;
  overflow: hidden;
  position: relative;
  padding: 30px;
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  font: 18px/21px 'Raleway';
  text-align: left;

  ${props =>
    !props.transparent &&
    css`
      height: 160px;
      margin-bottom: 50px;
    `};

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
    height: auto;
    padding: 30px 0 0 0;
    width: 100%;
    max-width: 620px;
    margin: 0 auto 40px auto;
    text-align: center;
    line-height: 25px;

    &:after{
      background: none;
    }
  `}
`;

export const SeeMore = styled(Button)`
  position: absolute;
  bottom: 0;
  left: 50%;
  height: 32px;
  margin: auto;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.greyLight3};
  border: 1.57px solid ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.orange};
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  font: 13.5px 'Raleway';

  ${media.greaterThan('medium')`
    display: none;
  `}
`;

export const Module = styled.div`
  ${media.greaterThan('medium')`
    max-width: 1000px;
    margin: auto;
    padding-top: 30px;
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
    padding: 0;
    max-width: 560px;
    margin-bottom: 15px;
    font-size: 41px;
    line-height: 40px;
    font-weight: ${({ theme }) => theme.fontsWeight.regular};
  `}
`;

export const TextModule = styled.p`
  padding: 0 30px 10px 30px;
  font: 18px/22px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.regular};

  ${media.greaterThan('medium')`
    padding: 0;
    margin-bottom: 25px;
    line-height: 25px;
    max-width: 650px;
  `}
`;

export const SlideSmall = styled(SlickSection)`
  margin: 30px auto;
  width: calc(100% - 60px);

  a {
    display: none;
  }

  ${media.greaterThan('medium')`
    max-width: 954px;
    width: 100%;
  `}
`;

export const Banner = styled.div`
  position: relative;
  padding: 0 30px 30px;

  img {
    width: 100%;
    height: auto;
  }

  ${media.greaterThan('medium')`
    img {
      margin: auto;
      max-width: 1000px;
    }
  `}
`;

export const Link = styled(Button)`
  height: 40px;
  position: absolute;
  left: 50px;
  bottom: 50px;
  line-height: 40px;

  ${media.greaterThan('medium')`
    left: 15%;
    bottom: 20%;
  `}
`;
