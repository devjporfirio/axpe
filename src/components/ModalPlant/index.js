import React from 'react';
import Modal from 'components/Modal';

// import { Container } from './styles';

export default function ModalPlant({ onClose }) {
  return (
    <Modal
      closeModal={onClose}
    >
      MODAL PLANTA
    </Modal>
  );
}
