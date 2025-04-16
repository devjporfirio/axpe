import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
    Content,
    BlockThree,
    Delivery,
    Location,
    InfoContent,
    ButtonVisit,
    ButtonMoreInfo,
    MainContainer,
    PriceGroupDesktop,
    PriceGroupMobile,
    CharacteristicsGrid,
    CharacteristicItem
} from './styles';

import ILocation from 'assets/icons/location.svg';
import ICheck from 'assets/icons/checked-grey.svg';

// Componentns
import VisitModal from './VisitModal';
import { MoreInformationModal } from '../../../components/Modals/MoreInformation';

import { useVisitModalContext } from './context';

export default function Datasheet({ property }) {
    const [ modalMoreInfoIsVisibility, setModalMoreInfoIsVisibility ] = useState(false);
    const { type, infos, category, address, label, values, source, vista } = property;
    const { setModalVisitOn } = useVisitModalContext();
    const { searchFunnel } = useSelector(state => state.main);
    const hasTitle = infos.titleSite || infos.internalDescription;

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${address.local}, ${address.state}, ${address.country} ${address.zipcode}`
    )}`;


    const openVisitModal = (e) => {
        e.preventDefault();
        setModalVisitOn(true);
    }

    const toggleModalMoreInfo  = (e) => {
        e.preventDefault();
        setModalMoreInfoIsVisibility(prevState => !prevState);
    }

    return (
        <>

            <MainContainer>
                <DatasheetContent>
                    <BlockOne type={property.type}>
                        <Neighborhood>{address.local}</Neighborhood>

                        {type === 'lancamento' && (
                            <CategoryRelease>{category}</CategoryRelease>
                        )}
                        {type !== 'lancamento' && <hr />}

                        <GroupInfo>
                            <InfoContent>
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

                        <ButtonVisit onClick={openVisitModal}>Agendar visita</ButtonVisit>
                        <ButtonMoreInfo onClick={toggleModalMoreInfo}>Mais informações</ButtonMoreInfo>
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
                        <Caracteristics.Parking parking={infos.parking} />
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

                    {hasTitle && (
                        <BlockTwo>
                            {/* <Content>{infos.titleSite}</Content>
                            <Content>{infos.shortDescription}</Content> */}
                            <Content>{infos.internalDescription}</Content>
                        </BlockTwo>
                    )}
                    
                        <BlockTwo>
                            <CharacteristicsGrid>
                                {Object.entries(vista?.Caracteristicas || {})
                                .filter(([ _, value ]) => value === 'Sim')
                                .map(([ label ]) => (
                                    <CharacteristicItem key={label}>
                                        <img src={ICheck} alt="ícone de Check" />
                                        <p>{label}</p>
                                    </CharacteristicItem>
                                ))}
                            </CharacteristicsGrid>
                        </BlockTwo>
                    
                </DatasheetContent>

                <PriceGroupDesktop>
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

                    <ButtonVisit onClick={openVisitModal}>Agendar visita</ButtonVisit>
                    <ButtonMoreInfo onClick={toggleModalMoreInfo}>Mais informações</ButtonMoreInfo>
                </PriceGroupDesktop>

            </MainContainer>
            {type === 'lancamento' && infos.releaseDelivery && (
                <Delivery>
                    <p>
                        {infos.releaseStatus === 'Pronto'
                            ? 'Entregue em '
                            : 'Previsão de entrega em '}
                        <span>{infos.releaseDelivery}</span>
                    </p>
                </Delivery>
            )}


            {/* <RenderVisitModal /> */}
            <VisitModal property={property} />

            {modalMoreInfoIsVisibility && (
                <MoreInformationModal
                    toggleModalMoreInfo={toggleModalMoreInfo}
                    address={address}
                />
            )}
        </>
    );
}
