import React from 'react';
import Link from 'next/link';

// components
import Section from 'components/Section';

// styles
import { Panel, Slide, Image } from './styles';

export default function Slides({ items = [], date }) {
  return (
    <Panel title={date}>
      <Slide
        slidesToShow={items.length > 4 ? 4 : items.length}
        propsArrow={{ position: 'center' }}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 660,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1
            }
          }
        ]}
      >
        {items.length > 0 &&
          items.map((item, index) => (
            <Link
              key={index}
              href={`/building/${
                item.building ? item.building.slug : item.slug
              }`}
            >
              <a
                href={`/building/${
                  item.building ? item.building.slug : item.slug
                }`}
              >
                <Image mq="desktop" src={item.imageFeatured.desktop} />
                <Image mq="mobile" src={item.imageFeatured.mobile} />
                <Section type="slickSmall" item={item} />
              </a>
            </Link>
          ))}
      </Slide>
    </Panel>
  );
}
