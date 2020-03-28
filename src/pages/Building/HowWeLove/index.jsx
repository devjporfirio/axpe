import React, { useCallback, useState, useEffect } from 'react';
import parse from 'html-react-parser';

// styles
import {
  Container,
  Title,
  Reasons
} from './styles';

function HowWeLove({ reasons }) {
  const [ html, setHtml ] = useState(null);
  const [ type, setType ] = useState(null);
  const [ data, setData ] = useState(null);

  const filterHtml = useCallback(() => {
    if(!data) return null;

    const response = data.title
      .replace('<div class="building-lovely-items">', '')
      .replace('<div class="building-lovely-items-wrapper">', '')
      .replace(/\n/g, '')
      .replace(/\r/g, '')
      .replace(/>\s+</g, '><')
      .replace(/<\/div>/gi, '')
      .trim();

    return parse(response);
  }, [ data ]);

  const checkSlidesToShow = useCallback(() => {
    if (type === 'html' && html && html.length) {
      return html.length > 5 ? 5 : html.length;
    } else if (type === 'array' && data && data.length) {
      return data.length > 5 ? 5 : data.length;
    }
    return 0;
  }, [ data, html ]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setType('array');
    } else {
      setType('html');
      setHtml(filterHtml());
    }
  }, [ data ]);

  useEffect(() => {
    setData(reasons);
  }, [ reasons ]);

  return (type === 'array' && data) || (type === 'html' && html && data) ? (
    <Container>
      <Title>
        <span>Por que </span>
        <span>curtimos </span>
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
            breakpoint: 639,
            settings: {
              slidesToShow: 1
            }
          }
        ]}
      >
        {type === 'html' && html}
        {type === 'array' &&
          data && data.length > 0 &&
          data.map((reason, index) => (
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
