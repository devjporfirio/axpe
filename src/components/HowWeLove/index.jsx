import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';

import { Container, Title, Reasons } from './styles';

function HowWeLove({ reasons }) {
  const [ html, setHtml ] = useState(null);
  const [ type, setType ] = useState(null);

  const filterHtml = () => {
    const response = reasons
      .replace('<div class="building-lovely-items">', '')
      .replace('<div class="building-lovely-items-wrapper">', '')
      .replace(/<\/div>/gi, '');

    return parse(response);
  }

  useEffect(() => {
    if(Array.isArray(reasons)) {
      setType('array');
    } else {
      setType('html')
      setHtml(filterHtml());
    }
  }, []);

  return type === 'array' || (type === 'html' && html) ? (
    <Container>
      <Title>
        <span>Por que </span>
        <span>adoramos </span>
        <span>esse imóvel</span>
      </Title>

      <Reasons
        slidesToShow={4}
        arrows={true}
        centerMode={true}
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
        {type === 'html' && html}
        {type === 'array' && (
          reasons.map((reason, index) => (
            <article className="building-lovely-item" key={index}>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </article>
          ))
        )}
      </Reasons>

      {/* <Reasons
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
        {reasons &&
          reasons.map((reason, index) => (
            <Section key={index}>
              <h1>{reason.title}</h1>
              <p>{reason.text}</p>
            </Section>
          ))}
      </Reasons> */}
    </Container>
  ) : null;
}

export default HowWeLove;