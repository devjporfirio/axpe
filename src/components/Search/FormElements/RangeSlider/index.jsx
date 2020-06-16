import React, { useRef, useState, useEffect } from 'react';
import noUiSlider from 'nouislider';
import { formatCurrency } from 'helpers/utils';

// styles
import { Container, Text, Slider } from './styles';

function RangeSlider({
  data,
  type,
  suffix = '',
  prefix = '',
  sep = '-',
  step = 100,
  onChange,
}) {
  const ref = useRef(null);
  const sliderApi = useRef(null);
  const [ values, setValues ] = useState(null);

  function saveValues(params) {
    setValues({
      first:
        type === 'prices'
          ? formatCurrency.format(params[0])
          : `${prefix}${params[0]}${suffix}`,
      last:
        type === 'prices'
          ? formatCurrency.format(params[1])
          : `${prefix}${params[1]}${suffix}`,
    });
  }

  function renderSlider() {
    if (!data) return false;

    if (sliderApi.current) {
      sliderApi.current.destroy();
    }

    let range = {
      min: data[0],
      max: data[1],
    };

    let firstHalf = parseInt((data[1] * 5) / 100);

    if(firstHalf >= 1000000) {
      firstHalf = 1000000;
    }

    if (type === 'prices') {
      range = {
        min: data[0],
        '50%': firstHalf,
        max: data[1],
      };
    }

    sliderApi.current = noUiSlider.create(ref.current, {
      start: data,
      connect: true,
      format: {
        to: function(value) {
          return parseInt(value);
        },
        from: function(value) {
          return parseInt(value.replace(',-', ''));
        },
      },
      step,
      range,
    });

    if (sliderApi.current) {
      sliderApi.current.on('update', saveValues);
      sliderApi.current.on('end', (params) => onChange([ params[0], params[1] ]));
    }
  }

  useEffect(() => {
    saveValues(data);
    renderSlider();
  }, [ data ]);

  return (
    <Container>
      {values ? <Text>{`${values.first} ${sep} ${values.last}`}</Text> : null}
      <Slider ref={ref}></Slider>
    </Container>
  );
}

export default RangeSlider;
