import React, { useCallback } from 'react';
import SVG from 'react-inlinesvg';

// helpers
import { Link } from 'helpers/routes';
import { formatCurrency } from 'helpers/utils';

// assets
import EmojiIconSVG from 'assets/icons/emoji';

// styles
import {
  Container,
  LinkTag,
  Wrapper,
  Gallery,
  Image,
  Column,
  Text,
  ButtonContainer,
  Inactive
} from './styles';

function BuildingCard({ layout = 'vertical', gtmShowcase = '', item }) {
  const itemData =
    item && item.building && Object.keys(item.building).length > 0
      ? item.building
      : item;

  const { category, values, infos, reference, address, status } = itemData;

  const sell =
    values && Object.keys(values).length > 0 && values.sell
      ? parseInt(values.sell)
      : '';

  const release =
    values && Object.keys(values).length > 0 && values.release
      ? parseInt(values.release)
      : '';

  const rent =
    values && Object.keys(values).length > 0 && values.rent
      ? parseInt(values.rent)
      : '';

  const renderGalleryImages = useCallback(() => {
    const urlImageDesktop =
      itemData.images && itemData.images.desktop
        ? itemData.images.desktop
        : itemData.imageFeatured
        ? itemData.imageFeatured.desktop
        : '';

    const urlImageMobile =
      itemData.images && itemData.images.mobile
        ? itemData.images.mobile
        : itemData.imageFeatured
        ? itemData.imageFeatured.mobile
        : '';

    return urlImageDesktop || urlImageMobile ? (
      <Gallery layout={layout}>
        {status === 'inactive' && (
          <Inactive>
            <SVG src={EmojiIconSVG} uniquifyIDs={true} />
            <p>
              <strong>Ops!</strong>
              <br />
              Esse imóvel não está mais disponível
            </p>
          </Inactive>
        )}
        {urlImageDesktop && <Image mq="desktop" src={urlImageDesktop} />}
        {urlImageMobile && <Image mq="mobile" src={urlImageMobile} />}
      </Gallery>
    ) : null;
  }, [ layout, itemData ]);

  const renderHTML = useCallback(() => {
    return (
      <Wrapper layout={layout}>
        {renderGalleryImages()}
        <Column layout={layout}>
          <Text layout={layout}>
            {address && address.local && <h4>{address.local}</h4>}
            <p>
              <span>
                {category}
                {(item.type && item.type === 'lancamento') ||
                (item.building && item.building.type === 'lancamento')
                  ? infos &&
                    infos.areaUsefulStart &&
                    infos.areaUsefulEnd &&
                    infos.areaUsefulEnd !== 99999999
                    ? `, ${infos.areaUsefulStart}m² a ${infos.areaUsefulEnd}m²`
                    : null
                  : `, ${
                      infos && infos.areaTotal ? infos.areaTotal + ' m²' : null
                    }`}
              </span>
              {sell || release || rent ? (
                <>
                  {sell || release ? (
                    <span>
                      {(item.type && item.type === 'lancamento') ||
                      (item.building && item.building.type === 'lancamento')
                        ? 'A partir de: '
                        : 'Venda: '}
                      {sell
                        ? formatCurrency.format(sell)
                        : formatCurrency.format(release)}
                    </span>
                  ) : null}
                  {rent ? (
                    <span>Aluguel: {formatCurrency.format(rent)}</span>
                  ) : null}
                </>
              ) : null}
              <span className="ref">Ref {reference}</span>
            </p>
          </Text>
          <ButtonContainer layout={layout}>Saiba mais</ButtonContainer>
        </Column>
      </Wrapper>
    );
  }, [ layout, itemData ]);

  return (
    <Container layout={layout}>
      {status !== 'inactive' ? (
        <Link route={`/${itemData.slug}`} passHref>
          <LinkTag
            layout={layout}
            className={
              gtmShowcase && gtmShowcase === 'Imóvel Recente'
                ? 'holos-account-product'
                : 'holos-home-product'
            }
            data-showcase={gtmShowcase}
            data-product-id={itemData.reference}
          >
            {renderHTML()}
          </LinkTag>
        </Link>
      ) : (
        renderHTML()
      )}
    </Container>
  );
}

export default BuildingCard;
