import React from 'react';

// helpers
import { formatCurrency } from 'helpers/utils';

// components
import Button from 'components/Button';

// styles
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
      {item.bullets && item.bullets.length ? (
        <Block2DestaqueTextoBullet>
          <ul>
            {item.bullets.map(bullet => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </Block2DestaqueTextoBullet>
      ) : null}
    </>
  );
}

function sectionMultiInfos(item, labelTitle) {
  const { category, values, infos, reference, slug, address } =
    item && item.building && Object.keys(item.building).length > 0
      ? item.building
      : item;

  const sell = Object.keys(values).length > 0 && parseInt(values.sell);
  const release = Object.keys(values).length > 0 && parseInt(values.release);
  const rent = Object.keys(values).length > 0 && parseInt(values.rent);

  return (
    <>
      {labelTitle && <h4>{item[labelTitle]}</h4>}
      {labelTitle && item[labelTitle] && <hr />}

      {address && address.local && <Local>{address.local}</Local>}
      <Infos>
        {category}, {infos && infos.areaTotal ? infos.areaTotal + ' m²' : null}
      </Infos>
      {sell || release ? (
        <Infos>
          Venda:
          {sell ? formatCurrency.format(sell) : formatCurrency.format(release)}
        </Infos>
      ) : null}
      {rent ? <Infos>Aluguel: {formatCurrency.format(rent)}</Infos> : null}

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
