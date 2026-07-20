import React, { useState } from "react";

import {
  ModalButton,
  ModalContainer,
  ModalForm,
  ModalInput,
  ModalOverlay,
  ModalText,
  ModalTitle,
} from "pages/ListaFavoritos/EmailModal.styles";

const FavoriteEmailModal = ({ onSave, onClose }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    localStorage.setItem("userEmail", email);
    onSave(email);
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="26"
          viewBox="0 0 25 26"
          fill="none"
          onClick={onClose}
          style={{ cursor: "pointer" }}
        >
          <rect width="25" height="26" rx="12.5" fill="#FF6200"/>
          <path d="M10.0844 8L12.5138 11.6901L14.9294 8H17L13.6043 13.0704L16.8896 18H14.819L12.5138 14.4507L10.1948 18H8.11043L11.3957 13.0704L8 8H10.0844Z" fill="white"/>
        </svg>

        <ModalTitle>
          Digite o seu email para salvar sua lista de favoritos
        </ModalTitle>

        <ModalText>
          Assim você pode voltar e ela fica guardada aqui
        </ModalText>

        <ModalForm onSubmit={handleSubmit}>
          <ModalInput
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <ModalButton type="submit" disabled={!email.trim()}>
            CONTINUAR
          </ModalButton>
        </ModalForm>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default FavoriteEmailModal;
