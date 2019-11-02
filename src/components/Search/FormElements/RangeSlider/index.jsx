import React, { useState, useEffect } from 'react'
import ReactSlider from 'react-slider'

// styles
import { Container, Text } from './styles'

function RangeSlider({ data, suffix = '', prefix = '', sep = '-', step = 100, onChange }) {

  const [ values, setValues ] = useState(null);

  useEffect(() => {
    setValues({
      first: data[0],
      last: data[1]
    })
  }, [])

  return (
    <Container>
      {values ? (
        <Text>
          {`${prefix}${values.first}${suffix}`} {sep} {`${prefix}${values.last}${suffix}`}
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
          onChange={params => setValues({
            first: params[0],
            last: params[1]
          })}
        />
      ) : null}
    </Container>
  )
}

export default RangeSlider
