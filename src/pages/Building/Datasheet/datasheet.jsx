import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMain } from 'store/modules/main/actions';
import SVG from 'react-inlinesvg';

import Tag from 'components/Tag';
import * as Caracteristics from 'pages/Building/Datasheet/caracteristics';

import {
    DatasheetContent,
    BlockOne,
    Type,
    GroupInfo,
    CategoryRelease,
    Neighborhood,
    GroupTags,
    BlockTwo,
    // Content,
    BlockThree,
    Location,
    InfoContent,
    ButtonMoreInfo,
    MainContainer,
    PriceGroupDesktop,
    PriceGroupMobile,
    CharacteristicsGrid,
    CharacteristicItem,
    BuildingTitle,
    Ref
} from './styles';
import { ButtonIcon } from '../../../components/Headerbar/styles';
import Share from 'components/Share';
import ILocation from 'assets/icons/location.svg';
import ICheck from 'assets/icons/checked-grey.svg';
import ShareIconSVG from 'assets/icons/share.svg';
import { useRouter } from 'next/router';

export default function Datasheet({ property }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { type, infos, category, address, label, values, source, vista, title, reference } = property;
    const { searchFunnel } = useSelector(state => state.main);
    const [ shareActive, setShareActive ] = useState(false);

    const toggleShare = useCallback(() => {
        setShareActive(!shareActive);
      }, [ shareActive ]);
    
    const shareOnClose = useCallback(() => {
      setShareActive(!shareActive);
    }, [ shareActive ]);
    
    // const hasTitle = infos.titleSite || infos.internalDescription;

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${address.local}, ${address.state}, ${address.country}`
      )}`;

    const toggleModalMoreInfo = () => {
      dispatch(
        setMain({
          contactBarActive: true,
          contactBarForced: true,
        })
      );
    };

    const totalValidVistaFields = [
        ...Object.entries(vista.Caracteristicas || {}),
        ...Object.entries(vista.InfraEstrutura || {})
      ].reduce((count, [ _, value ]) => {
        if (value === 'Sim' || (!isNaN(value) && Number(value) > 0)) {
          return count + 1;
        }
        return count;
      }, 0);
      
    const hasAtLeastThreeVistaInfos = totalValidVistaFields >= 3;

    return (
        <>
            <MainContainer>
                <DatasheetContent>
                    <BlockOne type={property.type}>
                        <Neighborhood>{address.local ?? address.state}<Ref> Ref {reference}</Ref></Neighborhood>
                        
                        <BuildingTitle>{title}</BuildingTitle>

                        {type === 'lancamento' && (
                            <CategoryRelease>{category}</CategoryRelease>
                        )}
                        
                        {type !== 'lancamento' && <hr />}

                        <GroupInfo>
                            <InfoContent>
                                {Object.values(label).some(value => value === true) && (
                                    <GroupTags>
                                        {label && label.isNew && (
                                            <Tag label={'Novidade'} icon="star" color="blueLight" />
                                        )}
                                        {label && label.isExclusive && (
                                            <Tag label={'Exclusividade'} icon="check" color="orange" />
                                        )}
                                        {label && label.isFurnished && (
                                            <Tag label={'Mobiliado'} icon="sofa" color="greenLight" />
                                        )}
                                    </GroupTags>
                                )}
                                <Type>
                                    {type === 'lancamento'
                                        ? infos.releaseStatus === 'Pronto'
                                            ? 'Pronto para morar'
                                            : infos.releaseStatus
                                        : category}
                                </Type>
                            </InfoContent>
                            <Location>
                                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                                    <img src={ILocation} alt="ícone de localização" />
                                    <p>Ver localização</p>
                                </a>
                                <ButtonIcon
                                    type="button"
                                    onClick={toggleShare}
                                    className="btn-share holos-search-header-button"
                                    data-showcase="Busca"
                                    data-label="Share"
                                    aria-label='Compartilhar'
                                >
                                    <SVG src={ShareIconSVG} uniquifyIDs={true} aria-hidden="true"/>
                                </ButtonIcon>
                            </Location>
                        </GroupInfo>
                    </BlockOne>

                    <PriceGroupMobile>
                        {!values.sell && !values.rent && values.valueOnlyConsults ? (
                            <Caracteristics.OnlyConsults />
                        ) : null}

                        {!!values.sell && (!searchFunnel || !searchFunnel.finality || searchFunnel.finality == 'venda') ? (
                            <Caracteristics.Sell
                                valueOnlyConsults={values.valueOnlyConsults}
                                sell={values.sell}
                                iptu={values.iptu}
                                condo={values.condo}
                                currency={values.currency}
                                type={type}
                            />
                        ) : null}

                        <Caracteristics.Release
                            release={values.release}
                            currency={values.currency}
                        />

                        {!!values.rent && (!searchFunnel || !searchFunnel.finality || searchFunnel.finality == 'aluguel') ? (
                            <Caracteristics.Rent
                                valueOnlyConsults={values.valueOnlyConsults}
                                rent={values.rent}
                                iptu={values.iptu}
                                condo={values.condo}
                                currency={values.currency}
                            />
                        ) : null}

                        <Caracteristics.Expenses
                            valueOnlyConsults={values.valueOnlyConsults}
                            rent={values.rent}
                            iptu={values.iptu}
                            condo={values.condo}
                            currency={values.currency}
                        />

                        {/* <ButtonVisit onClick={openVisitModal}>Agendar visita</ButtonVisit> */}
                        <ButtonMoreInfo onClick={toggleModalMoreInfo}>Fale com um corretor</ButtonMoreInfo>
                    </PriceGroupMobile>

                    <BlockThree type={property.type}>

                        {((category && category.search('Casa') < 0) || infos.areaUseful !== '') && infos.use !== 'COMERCIAL' && (
                            <Caracteristics.AreaUseFulBetween
                                start={infos.areaUsefulStart}
                                end={infos.areaUsefulEnd}
                            />
                        )}

                        <Caracteristics.AreaUseFul areaUseful={infos.areaUseful} />

                        <Caracteristics.AreaTotal areaTotal={infos.areaTotal} />

                        {category && category.search('Casa') < 0 && infos.use !== 'COMERCIAL' && (
                            <Caracteristics.AreaBuilding areaBuilding={infos.areaBuilding} />
                        )}

                        {infos.use !== 'COMERCIAL' && (
                            <Caracteristics.AreaGround areaGround={infos.areaGround} />
                        )}

                        <Caracteristics.Bedrooms
                            bedrooms={infos.bedrooms}
                        />

                        <Caracteristics.Suites
                            suites={infos.suites}
                        />

                        <Caracteristics.BedroomsBetween
                            start={infos.bedroomsStart}
                            end={infos.bedroomsEnd}
                        />

                        <Caracteristics.Parking
                            parking={
                                infos.parking && Number(infos.parking) > 0
                                ? infos.parking
                                : vista?.Caracteristicas?.['Vagas'] && Number(vista.Caracteristicas['Vagas']) > 0
                                ? Number(vista.Caracteristicas['Vagas'])
                                : 0
                            }
                        />

                        <Caracteristics.ParkingBetween
                            start={infos.parkingStart}
                            end={infos.parkingEnd}
                        />


                        {category && (category.search('Casa') < 0 && category !== 'Apartamento' && category !== 'Cobertura') &&
                            infos.use !== 'COMERCIAL' &&
                            source !== 'praia' &&
                            source !== 'campo' && (
                                <Caracteristics.AreaTotal areaTotal={infos.areaTotal} />
                            )}
                    </BlockThree>

                    {/* {hasTitle && (
                        <BlockTwo>
                            <Content>{infos.internalDescription}</Content>
                        </BlockTwo>
                    )} */}

                    {hasAtLeastThreeVistaInfos && (
                        <BlockTwo>
                            <CharacteristicsGrid>
                                {[
                                    ...Object.entries(vista.Caracteristicas || {}),
                                    ...Object.entries(vista.InfraEstrutura || {})
                                ]
                                    .filter(([ _, value ]) => value === 'Sim' || (!isNaN(value) && Number(value) > 0))
                                    .map(([ label ]) => (
                                        <CharacteristicItem key={label}>
                                            <img src={ICheck} alt="ícone de Check" />
                                            <p>{label}</p>
                                        </CharacteristicItem>
                                    ))}
                            </CharacteristicsGrid>
                        </BlockTwo>
                    )}
                
                </DatasheetContent>

                <PriceGroupDesktop type={type}>
                    {!values.sell && !values.rent && values.valueOnlyConsults ? (
                        <Caracteristics.OnlyConsults />
                    ) : null}

                    {!!values.sell && (!searchFunnel || !searchFunnel.finality || searchFunnel.finality == 'venda') ? (
                        <Caracteristics.Sell
                            valueOnlyConsults={values.valueOnlyConsults}
                            sell={values.sell}
                            iptu={values.iptu}
                            condo={values.condo}
                            currency={values.currency}
                            type={type}
                        />
                    ) : null}

                    <Caracteristics.Release
                        release={values.release}
                        currency={values.currency}
                    />

                    {!!values.rent && (!searchFunnel || !searchFunnel.finality || searchFunnel.finality == 'aluguel') ? (
                        <Caracteristics.Rent
                            valueOnlyConsults={values.valueOnlyConsults}
                            rent={values.rent}
                            iptu={values.iptu}
                            condo={values.condo}
                            currency={values.currency}
                        />
                    ) : null}

                    <Caracteristics.Expenses
                        valueOnlyConsults={values.valueOnlyConsults}
                        rent={values.rent}
                        iptu={values.iptu}
                        condo={values.condo}
                        currency={values.currency}
                    />

                    <ButtonMoreInfo onClick={toggleModalMoreInfo}>Fale com um corretor</ButtonMoreInfo>
                </PriceGroupDesktop>
                <Share
                    active={shareActive}
                    path={router.asPath}
                    title={`Axpe - Resultado de Busca`}
                    onClose={shareOnClose}
                />
            </MainContainer>
        </>
    );
}
