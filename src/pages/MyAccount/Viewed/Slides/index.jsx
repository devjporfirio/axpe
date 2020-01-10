import React, { Fragment } from 'react';
import Link from 'next/link';
import SVG from 'react-inlinesvg';

// components
import Section from 'components/Section';

// images
import IEmoji from 'assets/icons/emoji';

// styles
import { Panel, Slide, Image, Inactive } from './styles';

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
            <Fragment key={index}>
              <Link
                href={`/building/${
                  item.building ? item.building.slug : item.slug
                }`}
              >
                <a
                  href={`/building/${
                    item.building ? item.building.slug : item.slug
                  }`}
                >
                  {item.status === 'inactive' && (
                    <Inactive>
                      <SVG src={IEmoji} />
                      <p>
                        <strong>Ops!</strong>
                        <br />
                        Esse imóvel não está mais disponível
                      </p>
                    </Inactive>
                  )}
                  <Image mq="desktop" src={item.imageFeatured.desktop} />
                  <Image mq="mobile" src={item.imageFeatured.mobile} />
                  <Section type="slickSmall" item={item} useButtom={false} />
                </a>
              </Link>
            </Fragment>
          ))}
      </Slide>
    </Panel>
  );
}
