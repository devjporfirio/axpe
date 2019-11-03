import React, { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import { formatCurrency } from 'helpers/utils';

// styles
import { Container, Text } from './styles'

function RangeSlider({ data, type, suffix = '', prefix = '', sep = '-', step = 100, onChange }) {

  const [ values, setValues ] = useState(null);

  function saveValues(params) {
    setValues({
      first: type == 'prices' ? formatCurrency.format(params[0]) : `${prefix}${params[0]}${suffix}`,
      last: type == 'prices' ? formatCurrency.format(params[1]) : `${prefix}${params[1]}${suffix}`
    })
  }

  useEffect(() => {
    saveValues(data);
  }, [])

  return (
    <Container>
      {values ? (
        <Text>
          {`${values.first} ${sep} ${values.last}`}
        </Text>
      ) : null}
      {data.length ? (
        <ReactSlider
          defaultValue={data}
          min={data[0]}
          max={data[1]}
          ariaLabel={[ 'menor', 'maior' ]}
          step={step}
          minDistance={step}
          ariaValuetext={state => state.valueNow}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          onAfterChange={params => onChange([ params[0], params[1] ])}
          onChange={saveValues}
        />
      ) : null}
    </Container>
  )
}

export default RangeSlider
