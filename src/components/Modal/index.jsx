import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#main');

export default function Modal({
  open = true,
  afterOpenModal = () => {},
  closeModal = () => {},
  customStyles = {},
  label = 'Example Modal',
  children
}) {
  return (
    <ReactModal
      isOpen={open}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={label}
    >
      {children}
    </ReactModal>
  );
}
