import React from 'react';

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
  data,
  title,
  subtitle,
  itemClass,
  page = '',
  headerBig = false,
  buildingLayout = 'vertical',
  type = 'normal'
}) {
  const settings = {
    vertical: {
      dots: true,
      infinite: true,
      lazyLoad: true,
      speed: 800,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 2.2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1.1,
            slidesToScroll: 1,
          }
        }
      ],
    },
    horizontal: {
      dots: false,
      infinite: true,
      vertical: true,
      speed: 800,
      slidesToShow: 2.2,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1.1,
            slidesToScroll: 1,
            vertical: false
          }
        }
      ]
    },
  }

  return data && data.length >= 1 ? (
    <Container type={type} className={itemClass}>
      <Wrapper type={type}>
        <Header headerBig={headerBig}>
          {title && (
            <h3 dangerouslySetInnerHTML={{ __html: title }} />
          )}

          {subtitle && (
            <p dangerouslySetInnerHTML={{ __html: subtitle }} />
          )}
        </Header>

        {data && data.length > 0 ? (
          <Items data-layout={buildingLayout} data-quantity={data.length}>
            <SliderNew
              type="normal"
              settings={settings[buildingLayout]}
            >
              {data.map((building, buildingIndex) => (
                <BuildingCard
                  layout={buildingLayout}
                  item={building}
                  gtmShowcase={title}
                  positionIndex={buildingIndex + 1}
                  key={`building-searchitem-${building.reference}-${buildingIndex}`}
                />
              ))}
            </SliderNew>
          </Items>
        ) : null}
      </Wrapper>
    </Container>
  ) : null
}

export default BuildingsPanel;
