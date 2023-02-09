import React, { useRef, useState, useEffect } from 'react';
import noUiSlider from 'nouislider';
import { formatCurrency } from 'helpers/utils';

// styles
import { Container, Text, Slider } from './styles';

function RangeSlider({
  data,
  type,
  finality,
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
    let start = params[0];
    let end = params[1];

    if (type == 'prices') {
      if (finality === 'venda') {
        if (start <= 2000000) {
          start = `< ${formatCurrency.format(2000000)}`;
        } else {
          start = formatCurrency.format(start);
        }

        if (end >= 20000000) {
          end = `${formatCurrency.format(20000000)} >`;
        } else {
          end = formatCurrency.format(end);
        }
      } else {
        if (start <= 10000) {
          start = `< ${formatCurrency.format(10000)}`;
        } else {
          start = formatCurrency.format(start);
        }

        if (end >= 30000) {
          end = `${formatCurrency.format(30000)} >`;
        } else {
          end = formatCurrency.format(end);
        }
      }
    } else {
      start = `${prefix}${start}${suffix}`;
      end = `${prefix}${end}${suffix}`;
    }

    start = start.replace('R$', '<span>R$</span>');
    end = end.replace('R$', '<span>R$</span>');

    if (type == 'area') {
      const startVal = parseInt(start);
      const endVal = parseInt(end);

      if (startVal <= 50) {
        start = `< 50${suffix}`;
      } else {
        start = `${prefix}${Math.ceil(startVal / 5) * 5}${suffix}`;
      }

      if (endVal >= 2000) {
        end = `2000${suffix} >`;
      } else {
        end = `${prefix}${Math.ceil(endVal / 5) * 5}${suffix}`;
      }
    }

    setValues({
      first: start,
      last: end,
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

    switch (type) {
      case 'prices':
        if (finality === 'venda') {
          range = {
            min: 2000000,
            // min: [ 800000, 200000 ],
            // '5%': [ 1000000, 200000 ],
            // '40%': [ 3000000, 500000 ],
            // '60%': [ 5000000, 1000000 ],
            // '80%': [ 10000000, 2000000 ],
            max: 20000000,
          };
        } else {
          range = {
            min: [ 10000, 1000 ],
            '50%': [ 20000, 5000 ],
            max: 30000,
          };
        }
        break;
      case 'area':
        range = {
          min: 50,
          max: 2000,
        };
        break;
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

  const innerTextHTML = values ? `${values.first} ${sep} ${values.last}` : null;

  return (
    <Container>
      {values ? (
        <Text dangerouslySetInnerHTML={{ __html: innerTextHTML }}></Text>
      ) : null}
      <Slider ref={ref}></Slider>
    </Container>
  );
}

export default RangeSlider;
