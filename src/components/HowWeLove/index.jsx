import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';

import { Container, Title, Reasons } from './styles';

function HowWeLove({ reasons }) {
  const [ html, setHtml ] = useState(null);
  const [ type, setType ] = useState(null);

  const filterHtml = () => {
    const response = reasons.title
      .replace('<div class="building-lovely-items">', '')
      .replace('<div class="building-lovely-items-wrapper">', '')
      .replace(/\n/g, '')
      .replace(/\r/g, '')
      .replace(/>\s+</g, '><')
      .replace(/<\/div>/gi, '')
      .trim();

    return parse(response);
  };

  useEffect(() => {
    if (Array.isArray(reasons)) {
      setType('array');
    } else {
      setType('html');
      setHtml(filterHtml());
    }
  }, []);

  const checkSlidesToShow = () => {
    if (type === 'html' && html && html.length) {
      return html.length > 5 ? 5 : html.length;
    } else if (type === 'array' && reasons && reasons.length) {
      return reasons.length > 5 ? 5 : reasons.length;
    }
    return 0;
  };

  return type === 'array' || (type === 'html' && html) ? (
    <Container>
      <Title>
        <span>Por que </span>
        <span>adoramos </span>
        <span>esse imóvel</span>
      </Title>

      <Reasons
        slidesToShow={checkSlidesToShow()}
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
        {type === 'html' && html}
        {type === 'array' &&
          reasons && reasons.length > 0 &&
          reasons.map((reason, index) => (
            <article className="building-lovely-item" key={index}>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </article>
          ))}
      </Reasons>
    </Container>
  ) : null;
}

export default HowWeLove;
