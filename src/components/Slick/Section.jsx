import React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';
import Button from '../Button';

const SectionSlickLeftMobile = `
  position: initial;
  width: 70%;
  margin: auto;
  padding: 20px 0;

  h4 {
    font-size: 22px;
  }

  hr {
    margin: 20px 0;
  }

  button {
    width: 100%;
  }
`;

const Container = styled.section`
  z-index: 4;
  top: 110px;
  position: absolute;
  width: 245px;
  margin-left: 20px;
  background-color: ${props =>
    props.type !== 'slick' && props.theme.colors.white};

  h4 {
    color: ${props =>
      props.type === 'slick'
        ? props.theme.colors.white
        : props.theme.colors.greenDark};
    font-family: 'BitterRegular';
    font-size: 41px;
  }

  hr {
    width: 50px;
    border: 2px solid ${({ theme }) => theme.colors.orange};
    margin: 40px 0 25px;
  }

  p {
    color: ${props =>
      props.type === 'slick'
        ? props.theme.colors.white
        : props.theme.colors.greenDark};

    font-family: 'RalewaySemiBold';
    font-size: 18px;
    line-height: 25px;
  }

  ${media.lessThan('medium')`
    ${props => props.type !== 'slick' && SectionSlickLeftMobile}

    ${props =>
      [ 'slickLarge', 'slickSmall' ].includes(props.type) &&
      `
      width: 86%;
      padding: 20px 8%;
    `}
    
  `};

  ${props =>
    props.type === 'slickSmall' &&
    media.greaterThan('769px')`
      ${SectionSlickLeftMobile}
      margin-left: 20px !important;
      padding: 20px 8%;
      
      p {
        font-size: 16px;
      }

      button {
        display: none;
      }
    `}

  ${media.greaterThan('769px')`
    margin-left: 120px;
  
    ${props =>
      props.type === 'slickLeft' &&
      `
        position: absolute;
        top: 0;
        padding: 100px 30px;
        margin: 0;
        background-color: #fff;
        width: 320px;
        height: 100%;
    `}

    ${props => props.type === 'slickGrid' && `margin-left: 14%;`}
    ${props =>
      props.type === 'slickLarge' &&
      `
      position: unset;
      margin-top: -302px;
      margin-left: 59%;
      padding: 25px 4% 0 4%;
      height: 238px;
      width: 32%;
    `}
  `};
`;

function sectionSlick(item) {
  return (
    <>
      <h4>{item.title}</h4>
      {item.title && <hr />}
      <p>{item.content}</p>
    </>
  );
}

function selectionSlickLeft(item, labelTitle) {
  return (
    <>
      <h4>{item[labelTitle]}</h4>
      {item[labelTitle] && <hr />}
      <p>
        {item.building.infos.use}: {item.building.infos.areaTotal}
      </p>
      <p>Venda: {item.building.values.sell}</p>
      <p>Aluguel: {item.building.values.rent}</p>
      <br />
      <p>REF {item.building.reference}</p>
      <br />
      <Button
        label="Saiba mais"
        onClick={() => (location.href = `intern/${item.building.slug}`)}
      />
    </>
  );
}

function selectionSlickLarge(item) {
  return (
    <>
      <h4>{item.building.address.local}</h4>
      <p>
        {item.building.infos.use}: {item.building.infos.areaTotal}
      </p>
      <p>Venda: {item.building.values.sell}</p>
      <p>Aluguel: {item.building.values.rent}</p>
      <br />
      <p>REF {item.building.reference}</p>
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
      return selectionSlickLeft(item, 'title');
    case 'slickGrid':
      return selectionSlickLeft(item, 'titleWhite');
    case 'slickLarge':
    case 'slickSmall':
      return selectionSlickLarge(item);
  }
}

export default function Slick({ type, item }) {
  return <Container type={type}>{renderSelection(type, item)}</Container>;
}
