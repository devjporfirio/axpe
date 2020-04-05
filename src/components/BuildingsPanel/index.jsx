import React, { useState, useEffect } from 'react';

// components
import BuildingCard from 'components/Building/Card';
import SliderNew from 'components/SliderNew';

// styles
import {
  Container,
  Wrapper,
  Header,
  Items
} from './styles';

function BuildingsPanel({
  title,
  headerBig = false,
  buildingLayout = 'vertical',
  subtitle,
  data,
  type = 'normal'
}) {
  const [ items, setItems ] = useState([]);

  const settings = {
    vertical: {
      dots: false,
      infinite: false,
      lazyLoad: true,
      speed: 800,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    },
    horizontal: {
      dots: false,
      infinite: true,
      vertical: true,
      speed: 800,
      slidesToShow: 2,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            vertical: false
          }
        }
      ]
    },
  }

  useEffect(() => {
    let newItems = data;
    if(data.length < 3 && buildingLayout === 'horizontal') {
      newItems = newItems.concat(data, data);
    }
    setItems(newItems);
  }, [])

  return items && items.length >= 1 && (
    <Container type={type}>
      <Wrapper type={type}>
        <Header headerBig={headerBig}>
          {title && (
            <h3 dangerouslySetInnerHTML={{ __html: title }} />
          )}

          {subtitle && (
            <p dangerouslySetInnerHTML={{ __html: subtitle }} />
          )}
        </Header>

        {items && items.length > 0 ? (
          <Items>
            <SliderNew
              type="normal"
              arrowsColor="greenDark"
              settings={settings[buildingLayout]}
            >
              {items.map((building, buildingIndex) => (
                <BuildingCard
                  layout={buildingLayout}
                  item={building}
                  key={`building-searchitem-${building.reference}-${buildingIndex}`}
                />
              ))}
            </SliderNew>
          </Items>
        ) : null}
      </Wrapper>
    </Container>
  )
}

export default BuildingsPanel;
