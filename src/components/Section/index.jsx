import React from 'react';

// components
import Button from 'components/Button';

import {
  Container,
  LinkContainer,
  Local,
  Infos,
  Reference,
  Block1DestaqueTexto,
  Block2DestaqueTexto,
  Block1DestaqueTextoBullet,
  Block2DestaqueTextoBullet
} from './styles';

function sectionInfo(item) {
  return (
    <>
      <h4>{item.title}</h4>
      {item.title && <hr />}
      <Infos>{item.content || item.text}</Infos>
    </>
  );
}

function sectionDestaqueText(item) {
  return (
    <>
      <Block1DestaqueTexto>
        <h4>{item.title}</h4>
        {item.title && <hr />}
        <Infos>{item.text1}</Infos>
      </Block1DestaqueTexto>
      <Block2DestaqueTexto>
        <Infos>{item.text2}</Infos>
      </Block2DestaqueTexto>
    </>
  );
}

function sectionDestaqueTextBullets(item) {
  return (
    <>
      <Block1DestaqueTextoBullet>
        <h4>{item.texts.title}</h4>
        {item.texts.title && <hr />}
        <Infos>{item.texts.text}</Infos>
      </Block1DestaqueTextoBullet>
      <Block2DestaqueTextoBullet>
        <ul>
          {item.bullets.map(bullet => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </Block2DestaqueTextoBullet>
    </>
  );
}

function sectionMultiInfos(item, labelTitle) {
  const { category, values, infos, reference, slug, address } =
    item && item.building && Object.keys(item.building).lenght > 0
      ? item.building
      : item;
  return (
    <>
      {labelTitle && <h4>{item[labelTitle]}</h4>}
      {labelTitle && item[labelTitle] && <hr />}

      {address && address.local && <Local>{address.local}</Local>}
      <Infos>
        {category}, {infos && infos.areaTotal ? infos.areaTotal + ' m²' : ''}
      </Infos>
      {values && Object.keys(values).length > 0 && (values.sell || values.release) ? (
        <Infos>Venda: {values.sell || values.release}</Infos>
      ) : (
        ''
      )}
      {values && Object.keys(values).length > 0 && values.rent && <Infos>Aluguel: {values.rent}</Infos>}

      <Reference>Ref {reference}</Reference>
      <LinkContainer>
        <Button href="/building/[reference]" as={`/building/${slug}`}>
          Saiba mais
        </Button>
      </LinkContainer>
    </>
  );
}

function renderSelection(type, item) {
  switch (type) {
    case 'slick':
      return sectionInfo(item);
    case 'slickLeft':
      return sectionMultiInfos(item, 'title');
    case 'slickGrid':
      return sectionMultiInfos(item, 'titleWhite');
    case 'slickLarge':
    case 'slickSmall':
      return sectionMultiInfos(item);
    case 'destaque-texto':
      return sectionDestaqueText(item);
    case 'destaque-texto-bullets':
      return sectionDestaqueTextBullets(item);
    default:
      return sectionInfo(item);
  }
}

export default function Slick({
  type,
  item,
  className,
  showHorizontalRule = true
}) {
  return (
    <Container
      className={className}
      type={type}
      showHorizontalRule={showHorizontalRule}
    >
      {renderSelection(type, item)}
    </Container>
  );
}
