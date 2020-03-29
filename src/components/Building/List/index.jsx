import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SVG from 'react-inlinesvg';
import Api from 'services';

// components
import * as Caracteristics from 'pages/Building/Datasheet/caracteristics';
import Inactive from 'components/Inactive';
import SliderNew from 'components/SliderNew';

// helpers
import { Link } from 'helpers/routes';
import { formatCurrency, getBuildingUrl } from 'helpers/utils';
import checkFavorite from 'helpers/checkFavorite';

// actions
import { setMain } from 'store/modules/main/actions';
import { setUserBuildingToLike } from 'store/modules/user/actions';

// images
import LikeIconSVG from 'assets/icons/like';

import {
  Container,
  SliderContainer,
  SliderItem,
  LinkTag,
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
  Description,
  // ReleaseDelivery,
  RemoveButton,
  ScheduleButton,
  UndoButton,
  MessageSuccess
} from './styles';

function BuildingList({
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
    infos = {},
    category,
    type,
    reference,
    source,
    status
  } = item;
  const [ hasDeleted, setHasDeleted ] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { searchFunnel } = useSelector(state => state.main);
  const isFavoriteBuilding = checkFavorite(reference);
  const gallerySettings = {
    dots: false,
    infinite: true,
    lazyLoad: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const handleButtonRemove = useCallback(async (ref, action) => {
    await Api.MyAccount.postFavorite(user.access_token, ref, action);
    setHasDeleted(!action);
  }, [ user.logged ]);

  const handleButtonFavorite = useCallback(() => {
    if (user.logged) {
      dispatch(setUserBuildingToLike(reference));
    } else {
      const modalLoginUrl = location.pathname + location.search;
      dispatch(
        setMain({
          modalLogin:
            modalLoginUrl.search(/[?]/gi) >= 0
              ? `${modalLoginUrl}&favorite=true`
              : `${modalLoginUrl}?favorite=true`
        })
      );
      dispatch(setUserBuildingToLike(reference));
    }
  }, [ user.logged ]);

  const handleBtSchedule = useCallback(() => {
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
  }, []);

  const getCaracteristics = useCallback(() => {
    let items = [];
    const categoryText = category ? category : '';

    if(infos.bedrooms) {
      items.push(
        <Caracteristics.Bedrooms
          bedrooms={infos.bedrooms}
          suites={infos.suites}
          key={`caracteristic-${reference}-${items.length}`}
        />
      );
    }

    if(infos.bedroomsStart && infos.bedroomsEnd) {
      items.push(
        <Caracteristics.BedroomsBetween
          start={infos.bedroomsStart}
          end={infos.bedroomsEnd}
          key={`caracteristic-${reference}-${items.length}`}
        />
      );
    }

    if(infos.parking) {
      items.push(
        <Caracteristics.Parking
          parking={infos.parking}
          key={`caracteristic-${reference}-${items.length}`}
        />
      );
    }

    if(infos.parkingStart && infos.parkingEnd) {
      items.push(
        <Caracteristics.ParkingBetween
          start={infos.parkingStart}
          end={infos.parkingEnd}
          key={`caracteristic-${reference}-${items.length}`}
        />
      );
    }

    if(infos.areaBuilding &&
      infos.use !== 'COMERCIAL' &&
      categoryText !== 'Cobertura' &&
      categoryText !== 'Apartamento' &&
      categoryText.search('Casa') < 0
    ) {
      items.push(
        <Caracteristics.AreaBuilding
          areaBuilding={infos.areaBuilding}
          key={`caracteristic-${reference}-${items.length}`}
        />
      );
    }

    if(infos.areaUseful) {
      items.push(
        <Caracteristics.AreaUseFul
          areaUseful={infos.areaUseful}
          key={`caracteristic-${reference}-${items.length}`}
        />
      );
    }

    if(infos.areaGround &&
      infos.use !== 'COMERCIAL' &&
      categoryText !== 'Cobertura' &&
      categoryText !== 'Apartamento'
    ) {
      items.push(
        <Caracteristics.AreaGround
          areaGround={infos.areaGround}
          key={`caracteristic-${reference}-${items.length}`}
        />
      );
    }

    if(infos.areaUsefulStart &&
      infos.areaUsefulEnd &&
      infos.use !== 'COMERCIAL' &&
      categoryText !== 'Cobertura' &&
      categoryText !== 'Apartamento' &&
      categoryText.search('Casa') < 0
    ) {
      items.push(
        <Caracteristics.AreaUseFulBetween
          start={infos.areaUsefulStart}
          end={infos.areaUsefulEnd}
          key={`caracteristic-${reference}-${items.length}`}
        />
      );
    }

    if(infos &&
      infos.areaTotal &&
      infos.use !== 'COMERCIAL' &&
      source !== 'praia' &&
      source !== 'campo' &&
      categoryText !== 'Cobertura' &&
      categoryText !== 'Apartamento' &&
      categoryText.search('Casa') < 0
    ) {
      items.push(
        <Caracteristics.AreaTotal
          areaTotal={infos.areaTotal}
          key={`caracteristic-${reference}-${items.length}`}
        />
      );
    }

    items = items.slice(0, 4);

    return items;
  }, []);

  return (
    <Container
      className={className}
      useBtSchedule={useBtSchedule}
      hasDeleted={hasDeleted}
    >
      {useInactive && status === 'inactive' && <Inactive />}
      {!hasDeleted ? (
        <>
          <SliderContainer useBtSchedule={useBtSchedule}>
            <SliderNew
              type="gallery"
              arrowsColor="greenDark"
              settings={gallerySettings}
            >
              {gallery &&
                gallery.length > 0 &&
                gallery.map((galleryItem, galleryItemIndex) => {
                  return (
                    galleryItem.tipo === 'imagem' && (
                      <SliderItem key={`item-gallery-${reference}-${galleryItemIndex}`}>
                        <Link route={getBuildingUrl(item)} passHref>
                          <LinkTag>
                            <img src={galleryItem.src} alt={`Axpe ${category} - ${reference}`} />
                          </LinkTag>
                        </Link>
                      </SliderItem>
                    )
                  );
                })}
            </SliderNew>
          </SliderContainer>
          <Infos releaseDelivery={infos.releaseDelivery}>
            {useBtRemove && (
              <RemoveButton
                color="greenDark"
                type="button"
                onClick={() => handleButtonRemove(reference, false)}
              >
                Remover
              </RemoveButton>
            )}
            <Link route={getBuildingUrl(item)} passHref>
              <LinkTag>
                <CatLocGroup>
                  <Category>
                    {type === 'lancamento'
                      ? infos.releaseStatus === 'Pronto'
                        ? 'Pronto para morar'
                        : infos.releaseStatus
                      : category || 'Pronto para morar'}
                  </Category>
                  <div>
                    <div>
                      {address && address.local && <Local>{address.local}</Local>}
                      {type === 'lancamento' && (
                        <CategoryRelease>{category}</CategoryRelease>
                      )}
                    </div>
                    <Reference>Ref {item.reference}</Reference>
                  </div>
                </CatLocGroup>
              </LinkTag>
            </Link>

            <ValuesFavGroup>
              <Link route={getBuildingUrl(item)} passHref>
                <LinkTag>
                  <div>
                    {(!!values.sell || !!values.release) && (!searchFunnel || !searchFunnel.finality || searchFunnel.finality == 'venda') ? (
                      <Price>
                        {type === 'lancamento' ? 'A partir de: ' : 'Venda: '}
                        {!!values.sell &&
                          formatCurrency
                            .format(parseInt(values.sell))
                            .replace('R$', values.currency || 'R$')}
                        {!!values.release &&
                          formatCurrency
                            .format(parseInt(values.release))
                            .replace('R$', values.currency || 'R$')}
                      </Price>
                    ) : null}
                    {!!values.rent && (!searchFunnel || !searchFunnel.finality || searchFunnel.finality == 'aluguel') ? (
                      <Price>
                        Locação:{' '}
                        {formatCurrency
                          .format(parseInt(values.rent))
                          .replace('R$', values.currency || 'R$')}
                      </Price>
                    ) : null}
                  </div>
                </LinkTag>
              </Link>
              <FavoriteButton
                type="button"
                active={isFavoriteBuilding}
                onClick={handleButtonFavorite}
              >
                <SVG src={LikeIconSVG} uniquifyIDs={true} />
              </FavoriteButton>
            </ValuesFavGroup>
            <Link route={getBuildingUrl(item)} passHref>
              <LinkTag>
                <div>
                  <CaracteristicsGroup>
                    {getCaracteristics().map((item, itemIndex) => item)}
                  </CaracteristicsGroup>
                  <Description>{infos.internalDescription}</Description>
                </div>
              </LinkTag>
            </Link>
            {useBtSchedule && (
              <ScheduleButton type="button" onClick={handleBtSchedule}>
                Agende uma visita
              </ScheduleButton>
            )}
          </Infos>
          {/* {type === 'lancamento' && infos.releaseDelivery && (
            <ReleaseDelivery useBtSchedule={useBtSchedule}>
              {infos.releaseStatus === 'Pronto'
                ? 'Entregue em '
                : 'Previsão de entrega em '}
              <span>{infos.releaseDelivery}</span>
            </ReleaseDelivery>
          )} */}
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

export default BuildingList;