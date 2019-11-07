import React, { useRef, useState, useEffect } from 'react';
import noUiSlider from 'nouislider';
import { formatCurrency } from 'helpers/utils';

// styles
import { Container, Text, Slider } from './styles'

function RangeSlider({ data, type, suffix = '', prefix = '', sep = '-', step = 100, onChange }) {
  const refRangeSlider = useRef(null);
  const sliderApi = useRef(null);
  const [ values, setValues ] = useState(null);

  function saveValues(params) {
    setValues({
      first: type == 'prices' ? formatCurrency.format(params[0]) : `${prefix}${params[0]}${suffix}`,
      last: type == 'prices' ? formatCurrency.format(params[1]) : `${prefix}${params[1]}${suffix}`
    })
  }

  const attachRangeSlider = () => {
    if(!refRangeSlider || !refRangeSlider.current || !data) return false;

    sliderApi.current = noUiSlider.create(refRangeSlider.current, {
      start: data,
      connect: true,
      format: {
        to: function(value) {
          return parseInt(value);
        },
        from: function(value) {
          return parseInt(value.replace(',-', ''));
        }
      },
      step,
      range: {
        'min': data[0],
        'max': data[1]
      }
    });

    if(sliderApi.current) {
      sliderApi.current.on('update', saveValues);
      sliderApi.current.on('end', params => onChange([ params[0], params[1] ]))
    }
  }

  useEffect(() => {
    attachRangeSlider()
  }, [])

  useEffect(() => {
    saveValues(data);
  }, [ data ])

  return (
    <Container>
      {values ? (
        <Text>
          {`${values.first} ${sep} ${values.last}`}
        </Text>
      ) : null}
      <Slider ref={refRangeSlider}></Slider>
    </Container>
  )
}

export default RangeSlider
