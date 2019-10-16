import React from 'react';
import Button from '../Button';

import { Container, Local, Infos } from './styles';

function sectionSlick(item) {
  return (
    <>
      <h4>{item.title}</h4>
      {item.title && <hr />}
      <Infos>{item.content}</Infos>
    </>
  );
}

function selectionMultiInfos(item, labelTitle) {
  return (
    <>
      {labelTitle && <h4>{item[labelTitle]}</h4>}
      {labelTitle && item[labelTitle] && <hr />}
      <Local>{item.building.address.local}</Local>
      <br />
      <Infos>
        {item.building.infos.use}, {item.building.infos.areaTotal}
      </Infos>
      <Infos>Venda: {item.building.values.sell}</Infos>
      <Infos>Aluguel: {item.building.values.rent}</Infos>
      <br />
      <Infos>Ref {item.building.reference}</Infos>
      <br />
      <Button
        label="Saiba mais"
        onClick={() => (location.href = `intern/${item.building.slug}`)}
      />
    </>
  );
}

function renderSelection(type, item) {
  switch (type) {
    case 'slick':
      return sectionSlick(item);
    case 'slickLeft':
      return selectionMultiInfos(item, 'title');
    case 'slickGrid':
      return selectionMultiInfos(item, 'titleWhite');
    case 'slickLarge':
    case 'slickSmall':
      return selectionMultiInfos(item);
  }
}

export default function Slick({ type, item, className }) {
  return (
    <Container className={className} type={type}>
      {renderSelection(type, item)}
    </Container>
  );
}
