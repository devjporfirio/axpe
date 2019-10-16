import React from 'react';

import { Container, Title, Section, Reasons } from './styles';

export default function HowWeLove({ reasons }) {
  return (
    <Container>
      <Title>
        <span>Por que </span>
        <span>adoramos </span>
        <span>esse imóvel</span>
      </Title>

      <Reasons
        slidesToShow={4}
        arrows={true}
        propsArrow={{ color: 'white', position: 'center' }}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 660,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1
            }
          }
        ]}
      >
        {reasons.data &&
          reasons.data.map((reason, index) => (
            <Section key={index}>
              <h1>{reason.title}</h1>
              <p>{reason.text}</p>
            </Section>
          ))}
      </Reasons>
    </Container>
  );
}
