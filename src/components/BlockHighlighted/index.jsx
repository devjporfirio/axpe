import React from 'react';
import TextCustom from 'components/TextCustom';
import { Container, Highlighted, Link } from './styles';

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
          <TextCustom key={t.text} color={t.color} fontFamily={t.fontFamily}>
            {t.text}
          </TextCustom>
        ))}
      </Highlighted>
      <div>
        <p>{message}</p>
        <Link color={colorButton} label={labelButton} onClick={onClickButton} />
      </div>
    </Container>
  );
}
