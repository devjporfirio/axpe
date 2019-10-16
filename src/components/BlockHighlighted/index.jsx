import React from 'react';
import { Container, Highlighted, Text, Link } from './styles';

export default function BlockHighlighted({
  texts = [],
  message = '',
  labelButton = '',
  onClickButton = () => {},
  colorButton = ''
}) {
  return (
    <Container>
      <Highlighted>
        {texts.map(t => (
          <Text key={t.text} color={t.color} fontFamily={t.fontFamily}>
            {t.text}
          </Text>
        ))}
      </Highlighted>
      <div>
        <p>{message}</p>
        <Link color={colorButton} label={labelButton} onClick={onClickButton} />
      </div>
    </Container>
  );
}
