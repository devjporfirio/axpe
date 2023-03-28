import React, { useRef, useCallback, useState, useEffect } from 'react';
import parse from 'html-react-parser';

// components
import Slider from 'components/SliderNew';

// helpers
import useResize from 'helpers/resize';

// styles
import { Container, Title, Reasons } from './styles';

function HowWeLove({ reasons }) {
  const refReasons = useRef();
  const resizeWidth = useResize();
  const [ html, setHtml ] = useState(null);
  const [ type, setType ] = useState(null);
  const [ data, setData ] = useState(null);
  const [ settings, setSettings ] = useState({
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  const filterHtml = useCallback(() => {
    if (!data) return null;

    const response = data.title
      .replace('<div class="building-lovely-items">', '')
      .replace('<div class="building-lovely-items-wrapper">', '')
      .replace('<<article', '<article')
      .replace(/\n/g, '')
      .replace(/\r/g, '')
      .replace(/>\s+</g, '><')
      .replace(/<\/div>/gi, '')
      .trim();

    return parse(response);
  }, [ data ]);

  useEffect(() => {
    let total = 1;

    if (Array.isArray(data)) {
      total = data.length;
      setType('array');
    } else {
      const tempHtml = filterHtml();
      if (tempHtml) {
        total = tempHtml.length;
      }
      setType('html');
      setHtml(tempHtml);
    }

    if (total > 4) total = 4;

    setSettings({
      ...settings,
      slidesToShow: total,
    });
  }, [ data ]);

  useEffect(() => {
    function resetAllItems($items) {
      $items.forEach(($item) => {
        $item.style.minHeight = 'auto';
      });
    }

    if (refReasons.current) {
      const $items = refReasons.current.querySelectorAll(
        '.building-lovely-item'
      );
      let minHeight = 0;

      resetAllItems($items);

      $items.forEach(($item) => {
        minHeight = Math.max($item.offsetHeight, minHeight);
      });

      $items.forEach(($item) => {
        $item.style.minHeight = `${minHeight}px`;
      });
    }
  }, [ resizeWidth ]);

  useEffect(() => {
    setData(reasons);
  }, [ reasons ]);

  return (type === 'array' && data) || (type === 'html' && html && data) ? (
    <Container ref={refReasons}>
      <Title>
        <span>Porque </span>
        <span>curtimos </span>
        <span>esse imóvel</span>
      </Title>

      <Reasons>
        <Slider type="normal" arrowsColor="white" settings={settings}>
          {type === 'html' && html}
          {type === 'array' && data && data.length > 0
            ? data.map((reason, index) => (
                <article className="building-lovely-item" key={index}>
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </article>
              ))
            : null}
        </Slider>
      </Reasons>
    </Container>
  ) : null;
}

export default HowWeLove;
