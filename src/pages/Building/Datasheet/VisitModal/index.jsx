import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CloseIcon from 'assets/icons/axpe-modal-close-icon.svg';

import { useVisitModalContext } from "../context";

import {
    GenericDiv,
    ModalBody, // MODAL
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
    ModalInput,
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

export default function VisitModal(property) {

    const { address, gallery, infos  } = property.property;

    const {
        modalVisitOn,
        setModalVisitOn
    } = useVisitModalContext();

    //const [modalVisitOn, setModalVisitOn] = useState(null);
    const [scheduleList, setScheduleList] = useState(null);
    const [scheduleSelected, setScheduleSelected] = useState(null);

    const getSchedules = () => {
        let diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        let mesesDoAno = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

        let result = [];

        for (let i = 1; i <= 5; i++) {
            let data = new Date();
            data.setDate(data.getDate() + i);
            let day = diasDaSemana[data.getDay()];
            let dayNumber = data.getDate();
            let month = mesesDoAno[data.getMonth()];
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

    if (!modalVisitOn) {
        return null;
    }

    return (
        <div>
            <ModalBody>
                <ModalBodyWrapper>
                    <ModalWrapper>
                        <ModalHeader>
                            <ModalHeaderTitle>Solicite uma visita</ModalHeaderTitle>
                            <ModalHeaderBtnClose
                                onClick={closeVisitModal}
                            >
                                <ModalHeaderBtnCloseImage>
                                    <img src={CloseIcon} />
                                </ModalHeaderBtnCloseImage>
                            </ModalHeaderBtnClose>
                        </ModalHeader>
                        <ModalLocal>
                            <ModalLocalImage>
                                <img src={(gallery && gallery[0].src) || ''} />
                            </ModalLocalImage>
                            <ModalLocalDescription>
                                <ModalLocalTitle>{address.local}</ModalLocalTitle>
                                <ModalLocalInfos>
                                    {infos.areaTotal} m² | {infos.suites} Suite | {infos.bedrooms} Quartos | {infos.parking
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
                                <label for="acceptVisit">Ao clicar em Solicitar visita, você concorda com nosso Termos de Uso.</label>
                            </ModalFormGroupCheckbox>
                            <ModalFormSubmit>
                                <ModalFormBtnSubmit type="submit">Solicitar visita</ModalFormBtnSubmit>
                            </ModalFormSubmit>
                        </ModalForm>
                    </ModalWrapper>
                </ModalBodyWrapper>
            </ModalBody>
            <ModalOverlay />
        </div>
    )
}