import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SVG from 'react-inlinesvg';
import Link from 'next/link';
import Api from 'services';

// components
import * as Caracteristics from 'pages/Building/Datasheet/caracteristics';
import Inactive from 'components/Inactive';

// helpers
import { formatCurrency } from 'helpers/utils';
import checkFavorite from 'helpers/checkFavorite';

// actions
import { setMain } from 'store/modules/main/actions';
import { setUserBuildingToLike } from 'store/modules/user/actions';

// images
import LikeIconSVG from 'assets/icons/like';

import {
  Container,
  Infos,
  Category,
  CategoryRelease,
  Local,
  Reference,
  FavoriteButton,
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
  useBtSchedule,
  useInactive
}) {
  const {
    values,
    gallery,
    address,
    infos,
    category,
    type,
    reference,
    status
  } = item;
  const [ hasDeleted, setHasDeleted ] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const isFavoriteBuilding = checkFavorite(reference);

  const handleButtonRemove = async (ref, action) => {
    await Api.MyAccount.postFavorite(
      user.access_token,
      ref,
      action
    );
    setHasDeleted(!action);
  };

  const handleButtonFavorite = () => {
    if (user.logged) {
      dispatch(setUserBuildingToLike(reference));
    } else {
      dispatch(
        setMain({
          modalLogin: true
        })
      );
      dispatch(setUserBuildingToLike(reference));
    }
  };

  const handleBtSchedule = () => {
    dispatch(
      setMain({
        modalContact: true,
        modalContactMessage: `Olá, gostaria de saber mais sobre o imóvel ${reference} - ${
          address.local ? `${address.local}, ` : ''
        } ${infos.areaTotal ? `com ${infos.areaTotal} m²,` : ''} ${
          infos.bedrooms ? `${infos.bedrooms} quartos` : ''
        } ${infos.parking ? `e ${infos.parking} vagas` : ''}.`
      })
    );
  };

  return (
    <Container
      className={className}
      useBtSchedule={useBtSchedule}
      hasDeleted={hasDeleted}
    >
      {useInactive && status === 'inactive' && <Inactive />}
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
                        as={`/building/${reference}`}
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
                onClick={() => handleButtonRemove(reference, false)}
              >
                Remover
              </RemoveButton>
            )}
            <Link href="/building/[reference]" as={`/building/${reference}`}>
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
                    {address.local && (
                      <Local>{address.local}</Local>
                    )}
                    {type === 'lancamento' && (
                      <CategoryRelease>{category}</CategoryRelease>
                    )}
                  </div>
                  <Reference>Ref {item.reference}</Reference>
                </div>
              </CatLocGroup>
            </Link>

            <ValuesFavGroup>
              <Link href="/building/[reference]" as={`/building/${reference}`}>
                <div>
                  {!!values.sell || !!values.release ? (
                    <Price>
                      {type === 'lancamento' ? 'A partir de: ': 'Venda: '}
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
              <FavoriteButton type="button" active={isFavoriteBuilding} onClick={handleButtonFavorite}>
                <SVG src={LikeIconSVG} uniquifyIDs={true} />
              </FavoriteButton>
            </ValuesFavGroup>
            <Link href="/building/[reference]" as={`/building/${reference}`}>
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
              </div>
            </Link>
            {useBtSchedule && (
              <ScheduleButton type="button" onClick={handleBtSchedule}>
                Agende uma visita
              </ScheduleButton>
            )}
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
            onClick={() => handleButtonRemove(reference, true)}
          >
            Desfazer
          </UndoButton>
        </>
      )}
    </Container>
  );
}
