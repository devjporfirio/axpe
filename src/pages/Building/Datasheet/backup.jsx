import React, { useEffect, useState } from 'react';
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
    GenericDiv,
    ModalBody,
    ModalBodyWrapper,
    ModalWrapper,
    ModalOverlay,
    ModalHeader,
    ModalHeaderTitle,
    ModalHeaderBtnClose,
    ModalHeaderBtnCloseImage,
    ModalLocal,
    ModalLocalImage,
    ModalLocalDescription,
    ModalLocalTitle,
    ModalLocalInfos,
    ModalForm,
    ModalFormGroupNames,
    ModalFormGroup,
    ModalFormGroupCheckbox,
    ModalSchedule,
    ModalScheduleTitle,
    ModalScheduleWrapper,
    ModalScheduleItem,
    ModalScheduleItemLine,
    ModalScheduleItemDay,
    ModalScheduleItemDayNumber,
    ModalScheduleItemMonth,
    ModalScheduleHour,
    ModalScheduleSelect,
    ModalFormSubmit,
    ModalFormBtnSubmit
} from './styles';

import ILocation from 'assets/icons/location.svg';
import CloseIcon from 'assets/icons/axpe-modal-close-icon.svg';

// Componentns
import VisitModal from './VisitModal';

import { VisitModalProvider, useVisitModalContext } from './context';

export default function Datasheet({ property }) {
    const { type, infos, category, address, label, values, source } = property;
    const { searchFunnel } = useSelector(state => state.main);
    const hasTitle = infos.titleSite || infos.internalDescription;

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${address.local}, ${address.state}, ${address.country} ${address.zipcode}`
    )}`;

    // const [modalVisitOn, setModalVisitOn] = useState(null);

    const {
        modalVisitOn,
        setModalVisitOn
    } = useVisitModalContext();

    const [ scheduleList, setScheduleList ] = useState(null);
    const [ scheduleSelected, setScheduleSelected ] = useState(null);

    const getSchedules = () => {
        const diasDaSemana = [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ];
        const mesesDoAno = [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ];

        const result = [];

        for (let i = 1; i <= 5; i++) {
            const data = new Date();
            data.setDate(data.getDate() + i);
            const day = diasDaSemana[data.getDay()];
            const dayNumber = data.getDate();
            const month = mesesDoAno[data.getMonth()];
            result.push({ day, dayNumber, month });
        }

        setScheduleList(result);
    }

    const openVisitModal = (e) => {
        e.preventDefault();
        setModalVisitOn(true);
    }

    const closeVisitModal = (e) => {
        e.preventDefault();
        setModalVisitOn(null);
    }

    const setSelectDate = (e, item) => {
        e.preventDefault();
        setScheduleSelected(item);
    }

    useEffect(() => {
        getSchedules();
    }, []);

    const RenderSchedule = () => {
        if (!scheduleList) {
            return null;
        }

        return scheduleList.map((item, index) => (
            <ModalScheduleItem key={index}>
                <ModalScheduleItemLine
                    onClick={e => setSelectDate(e, item)}
                    selected={scheduleSelected === item}
                >
                    <ModalScheduleItemDay>{item.day}</ModalScheduleItemDay>
                    <ModalScheduleItemDayNumber>{item.dayNumber}</ModalScheduleItemDayNumber>
                    <ModalScheduleItemMonth>{item.month}</ModalScheduleItemMonth>
                </ModalScheduleItemLine>
            </ModalScheduleItem>
        ));
    }

    const RenderVisitModal = () => {
        if (!modalVisitOn) {
            return null;
        }

        return (
            <GenericDiv>
                <ModalBody>
                    <ModalBodyWrapper>
                        <ModalWrapper>
                            <ModalHeader>
                                <ModalHeaderTitle>Solicite uma visita</ModalHeaderTitle>
                                <ModalHeaderBtnClose
                                    onClick={closeVisitModal}
                                >
                                    <ModalHeaderBtnCloseImage>
                                        <img src={CloseIcon} alt=''/>
                                    </ModalHeaderBtnCloseImage>
                                </ModalHeaderBtnClose>
                            </ModalHeader>
                            <ModalLocal>
                                <ModalLocalImage>
                                    <img src={(property.gallery && property.gallery[0].src) || ''} alt='' />
                                </ModalLocalImage>
                                <ModalLocalDescription>
                                    <ModalLocalTitle>{property.address.local}</ModalLocalTitle>
                                    <ModalLocalInfos>
                                        {property.infos.areaTotal} m² | {property.infos.suites} Suite | {property.infos.bedrooms} Quartos | {property.infos.parking
                                        } Vagas
                                    </ModalLocalInfos>
                                </ModalLocalDescription>
                            </ModalLocal>
                            <ModalForm>
                                <ModalFormGroupNames>
                                    <div>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Nome"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="lastname"
                                            placeholder="Sobrenome"
                                        />
                                    </div>
                                </ModalFormGroupNames>
                                <ModalFormGroup>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Seu E-mail"
                                    />
                                </ModalFormGroup>
                                <ModalFormGroup>
                                    <input
                                        type="text"
                                        name="whatsapp"
                                        placeholder="Seu WhatsApp"
                                    />
                                </ModalFormGroup>
                                <ModalSchedule>
                                    <ModalScheduleTitle>Escolha o dia da sua visita</ModalScheduleTitle>
                                    <ModalScheduleWrapper>

                                        {/* ITEM */}
                                        <RenderSchedule />
                                        {/* -- */}

                                    </ModalScheduleWrapper>
                                </ModalSchedule>
                                <ModalScheduleHour>
                                    <ModalScheduleSelect name="hour">
                                        <option valeu="09">9:00</option>
                                        <option valeu="09">10:00</option>
                                        <option valeu="09">11:00</option>
                                        <option valeu="09">12:00</option>
                                        <option valeu="09">13:00</option>
                                        <option valeu="09">14:00</option>
                                        <option valeu="09">15:00</option>
                                        <option valeu="09">16:00</option>
                                    </ModalScheduleSelect>
                                </ModalScheduleHour>
                                <ModalFormGroupCheckbox>
                                    <input
                                        type="checkbox"
                                        name="accept"
                                        id="acceptVisit"
                                    />
                                    <label htmlFor='acceptVisit' for="acceptVisit">Ao clicar em Solicitar visita, você concorda com nosso Termos de Uso.</label>
                                </ModalFormGroupCheckbox>
                                <ModalFormSubmit>
                                    <ModalFormBtnSubmit type="submit">Solicitar visita</ModalFormBtnSubmit>
                                </ModalFormSubmit>
                            </ModalForm>
                        </ModalWrapper>
                    </ModalBodyWrapper>
                </ModalBody>
                <ModalOverlay />
            </GenericDiv>
        )
    }

    return (
        <>
            <VisitModalProvider>

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
                            <ButtonMoreInfo>Mais informações</ButtonMoreInfo>
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
                                <Content>{infos.titleSite}</Content>
                                <Content>{infos.shortDescription}</Content>
                                <Content>{infos.internalDescription}</Content>
                            </BlockTwo>
                        )}
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
                        <ButtonMoreInfo>Mais informações</ButtonMoreInfo>
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


                <RenderVisitModal />
                <VisitModal data={property} />

            </VisitModalProvider>
        </>
    );
}
