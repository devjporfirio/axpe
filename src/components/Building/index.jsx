import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import * as Caracteristics from 'pages/Building/Datasheet/caracteristics';
import Api from 'services';

// helpers
import { formatCurrency } from 'helpers/utils';
import checkFavorite from 'helpers/checkFavorite';

// actions
import { setMain } from 'store/modules/main/actions';
import { setUser } from 'store/modules/user/actions';

// images
import IHeartBlack from 'assets/icons/heart-black.svg';
import IHeartChecked from 'assets/icons/heart-orange-checked.svg';

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
  ReleaseDelivery,
  RemoveButton,
  ScheduleButton,
  UndoButton,
  MessageSuccess
} from './styles';

export default function Building({
  item,
  className,
  useBtRemove,
  useBtSchedule
}) {
  const { values, gallery, address, slug, infos, category, type } = item;
  const [ hasDeleted, sethasDeleted ] = useState(false);
  const dispatch = useDispatch();
  const access = useSelector(state => state.user);

  const isFavoriteBuilding = checkFavorite(slug);

  const handleBtRemove = async (slug, status) => {
    const response = await Api.MyAccount.postFavorite(
      access.access_token,
      slug,
      status
    );
    if (response.status) {
      sethasDeleted(!status);
    }
  };

  const handleBtFavorite = async () => {
    if (access.logged) {
      const response = await Api.MyAccount.postFavorite(
        access.access_token,
        slug,
        !isFavoriteBuilding
      );
      if (response && response.status) {
        const favorites = await Api.MyAccount.getFavorites(access.access_token);
        dispatch(
          setUser({
            favorites
          })
        );
      }
    } else {
      dispatch(
        setMain({
          modalLogin: true
        })
      );
    }
  };

  return (
    <Container
      className={className}
      useBtSchedule={useBtSchedule}
      hasDeleted={hasDeleted}
    >
      {!hasDeleted ? (
        <>
          <Slider
            useBtSchedule={useBtSchedule}
            propsArrow={{ type: 'building', backgroundColor: 'white' }}
          >
            {gallery &&
              gallery.length > 0 &&
              gallery.map((item, index) => {
                return (
                  item.tipo === 'imagem' && (
                    <div key={index}>
                      <Link
                        href="/building/[reference]"
                        as={`/building/${slug}`}
                      >
                        <img src={item.src} alt="Imóvel" />
                      </Link>
                    </div>
                  )
                );
              })}
          </Slider>
          <Infos>
            {useBtRemove && (
              <RemoveButton
                color="greenDark"
                type="button"
                onClick={() => handleBtRemove(slug, false)}
              >
                Remover
              </RemoveButton>
            )}
            <Link href="/building/[reference]" as={`/building/${slug}`}>
              <CatLocGroup>
                <Category>
                  {type === 'lancamento'
                    ? infos.releaseStatus === 'Pronto'
                      ? 'Pronto para morar'
                      : infos.releaseStatus
                    : category}
                </Category>
                <div>
                  <div>
                    <Local>{address.local}</Local>
                    {type === 'lancamento' && (
                      <CategoryRelease>{category}</CategoryRelease>
                    )}
                  </div>
                  <Reference>Ref {item.reference}</Reference>
                </div>
              </CatLocGroup>
            </Link>

            <ValuesFavGroup>
              <Link href="/building/[reference]" as={`/building/${slug}`}>
                <div>
                  {!!values.sell || !!values.release ? (
                    <Price>
                      A partir de:{' '}
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
                src={isFavoriteBuilding ? IHeartChecked : IHeartBlack}
                alt="Favorito"
                onClick={handleBtFavorite}
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
                  <Caracteristics.AreaBuilding
                    areaBuilding={infos.areaBuilding}
                  />
                  <Caracteristics.AreaGround areaGround={infos.areaGround} />
                  <Caracteristics.AreaUseFul areaUseful={infos.areaUseful} />
                  <Caracteristics.AreaUseFulBetween
                    start={infos.areaUsefulStart}
                    end={infos.areaUsefulEnd}
                  />
                  <Caracteristics.AreaTotal areaTotal={infos.areaTotal} />
                </CaracteristicsGroup>

                <Description>{infos.internalDescription}</Description>

                {useBtSchedule && (
                  <ScheduleButton type="button">
                    Agende uma visita
                  </ScheduleButton>
                )}
              </div>
            </Link>
          </Infos>
          {type === 'lancamento' && infos.releaseDelivery && (
            <ReleaseDelivery useBtSchedule={useBtSchedule}>
              {infos.releaseStatus === 'Pronto'
                ? 'Entregue em '
                : 'Previsão de entrega em '}
              <span>{infos.releaseDelivery}</span>
            </ReleaseDelivery>
          )}
        </>
      ) : (
        <>
          <MessageSuccess>Imóvel favorito removido com sucesso</MessageSuccess>
          <UndoButton
            color="greenDark"
            type="button"
            onClick={() => handleBtRemove(slug, true)}
          >
            Desfazer
          </UndoButton>
        </>
      )}
    </Container>
  );
}
