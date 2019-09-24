import styled from 'styled-components';
import Slider from 'react-slick';

export const Container = styled(Slider)``;

export const Slide = styled.a``;

export const Section = styled.section`
  position: absolute;
  top: 110px;
  z-index: 4;
  width: 245px;
  margin-left: 20px;

  h4 {
    color: ${props =>
      props.type === 'slide'
        ? props.theme.colors.white
        : props.theme.colors.black};
    font-family: 'BitterRegular', ${props => props.type};
    font-size: 41px;
  }

  hr {
    width: 50px;
    margin: 40px 0 25px;
    border: 2px solid ${({ theme }) => theme.colors.orange};
  }

  p {
    color: ${props =>
      props.type === 'slide'
        ? props.theme.colors.white
        : props.theme.colors.black};

    font-family: 'RalewaySemiBold';
    font-size: 18px;
    line-height: 25px;
  }

  ${({ theme }) =>
    theme.minScreen(
      'tablet',
      `
        margin-left: 120px;
      `
    )}
`;

export const GradientImage = styled.div`
  position: absolute;
  width: 100%;
  height: ${props => (props.mq === 'mobile' ? '507px' : '700px')};
  z-index: 2;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 100),
    rgba(0, 0, 0, 0)
  );
  opacity: 0.6;
`;

export const Image = styled.img`
  height: ${props => (props.mq === 'mobile' ? '507px' : '700px')};
  z-index: 1;

  ${props =>
    props.mq === 'mobile'
      ? props.theme.minScreen(
          'tablet',
          `
          display: none !important;
          `
        )
      : props.theme.maxScreen(
          'tablet',
          `
            display: none !important;
      `
        )}
`;

const Arrow = styled.img`
  width: 24px;
  height: 24px;
  z-index: 3;
  position: absolute;
  bottom: 0;
  margin-left: 20px;
  margin-bottom: 20px;

  ${({ theme }) =>
    theme.minScreen(
      'tablet',
      `
        margin-left: 320px;
        margin-bottom: 120px;
      `
    )}
`;
export const ArrowNextWhite = styled(Arrow)`
  margin-top: -100px;
  margin-left: 60px;

  ${({ theme }) =>
    theme.minScreen(
      'tablet',
      `
        margin-left: 360px;
      `
    )}
`;
export const ArrowPrevWhite = styled(Arrow)``;
