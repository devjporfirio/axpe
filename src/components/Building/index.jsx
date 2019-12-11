import React, { useState } from 'react';
import * as Caracteristics from 'pages/Building/Datasheet/caracteristics';
import { formatCurrency } from 'helpers/utils';

import IHeartBlack from 'assets/icons/heart-black.svg';
import Link from 'next/link';

import {
  Container,
  Infos,
  Category,
  CategoryRelease,
  Local,
  Reference,
  Favorito,
  CaracteristicsGroup,
  ValuesFavGroup,
  CatLocGroup,
  Price,
  Slider,
  Description,
  ReleaseDelivery
} from './styles';

export default function Building({ item }) {
  const { values, gallery, address, slug, infos, category, type } = item;
  const [ showVideo, setShowVideo ] = useState(false);

  return (
    <Container>
      <Slider propsArrow={{ type: 'building', backgroundColor: 'white' }}>
        {gallery &&
          gallery.length > 0 &&
          gallery.map((item, index) => {
            switch (item.tipo) {
              case 'imagem':
                return (
                  <div key={index}>
                    <Link href="/building/[reference]" as={`/building/${slug}`}>
                      <img src={item.src} alt="Imóvel" />
                    </Link>
                  </div>
                );
              case 'video':
                return (
                  <div key={index}>
                    {!showVideo && (
                      <img
                        src={item.src}
                        alt="Imóvel"
                        role="presentation"
                        onClick={() => setShowVideo(true)}
                      />
                    )}
                    {showVideo && (
                      <iframe
                        title={index}
                        key={index}
                        src={`https://www.youtube.com/embed/${item.video}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </div>
                );
            }
          })}
      </Slider>
      <Infos>
        <Link href="/building/[reference]" as={`/building/${slug}`}>
          <CatLocGroup>
            <div>
              <Category>
                {type === 'lancamento' ? infos.releaseStatus : category}
              </Category>
              <Local>{address.local}</Local>
              {type === 'lancamento' && (
                <CategoryRelease>{category}</CategoryRelease>
              )}
            </div>
            <Reference>Ref {item.reference}</Reference>
          </CatLocGroup>
        </Link>

        <ValuesFavGroup>
          <Link href="/building/[reference]" as={`/building/${slug}`}>
            <div>
              {!!values.sell || !!values.release ? (
                <Price>
                  Venda:{' '}
                  {!!values.sell &&
                    formatCurrency.format(parseInt(values.sell))}
                  {!!values.release &&
                    formatCurrency.format(parseInt(values.release))}
                </Price>
              ) : (
                ''
              )}
              {!!values.rent ? (
                <Price>
                  Locação: {formatCurrency.format(parseInt(values.rent))}
                </Price>
              ) : (
                ''
              )}
            </div>
          </Link>
          <Favorito
            src={IHeartBlack}
            alt="Favorito"
            onClick={() => alert('Favoritado')}
          />
        </ValuesFavGroup>
        <Link href="/building/[reference]" as={`/building/${slug}`}>
          <div>
            <CaracteristicsGroup>
              <Caracteristics.Bedrooms
                bedrooms={infos.bedrooms}
                suites={infos.suites}
              />
              <Caracteristics.BedroomsBetween
                start={infos.bedroomsStart}
                end={infos.bedroomsEnd}
              />
              <Caracteristics.Parking parking={infos.parking} />
              <Caracteristics.ParkingBetween
                start={infos.parkingStart}
                end={infos.parkingEnd}
              />
              <Caracteristics.AreaBuilding areaBuilding={infos.areaBuilding} />
              <Caracteristics.AreaGround areaGround={infos.areaGround} />
              <Caracteristics.AreaUseFul areaUseful={infos.areaUseful} />
              <Caracteristics.AreaUseFulBetween
                start={infos.areaUsefulStart}
                end={infos.areaUsefulEnd}
              />
              <Caracteristics.AreaTotal areaTotal={infos.areaTotal} />
            </CaracteristicsGroup>

            <Description>{infos.internalDescription}</Description>
          </div>
        </Link>
      </Infos>
      {type === 'lancamento' && infos.releaseDelivery && (
        <ReleaseDelivery>
          Previsão de entrega em <span>{infos.releaseDelivery}</span>
        </ReleaseDelivery>
      )}
    </Container>
  );
}
