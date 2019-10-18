import React from 'react';
import Button from '../Button';

import { Container, Local, Infos } from './styles';

function sectionInfo(item) {
  return (
    <>
      <h4>{item.title}</h4>
      {item.title && <hr />}
      <Infos>{item.content || item.text}</Infos>
    </>
  );
}

function selectionMultiInfos(item, labelTitle) {
  const { values, infos, reference, slug, address } = item.building;
  return (
    <>
      {labelTitle && <h4>{item[labelTitle]}</h4>}
      {labelTitle && item[labelTitle] && <hr />}

      <Local>{address.local}</Local>
      
      <br />
      
      <Infos>
        {infos.use}, {infos.areaTotal}
      </Infos>
      {values.sell || values.release ? <Infos>Venda: {values.sell || values.release}</Infos> : ''}
      {!!values.rent && <Infos>Aluguel: {values.rent}</Infos>}

      <br />
      
      <Infos>Ref {reference}</Infos>
      
      <br />
      <Button
        label="Saiba mais"
        onClick={() => (location.href = `intern/${slug}`)}
      />
    </>
  );
}

function renderSelection(type, item) {
  switch (type) {
    case 'slick':
      return sectionInfo(item);
    case 'slickLeft':
      return selectionMultiInfos(item, 'title');
    case 'slickGrid':
      return selectionMultiInfos(item, 'titleWhite');
    case 'slickLarge':
    case 'slickSmall':
      return selectionMultiInfos(item);
    default:
      return sectionInfo(item);
  }
}

export default function Slick({ type, item, className }) {
  return (
    <Container className={className} type={type}>
      {renderSelection(type, item)}
    </Container>
  );
}
