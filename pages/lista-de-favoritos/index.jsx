"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import NewsletterFooter from "components/NewsletterFooter";
import NewContactSection from "components/NewContactSection";

import {
  ModalButton,
  ModalContainer,
  ModalForm,
  ModalInput,
  ModalOverlay,
  ModalText,
  ModalTitle,
} from "../../src/pages/ListaFavoritos/EmailModal.styles";

import FavoriteListForm from "pages/Favorites/FavoriteListForm";

import {
  FavoriteHeader,
  FavoriteHeaderTitle,
} from "pages/ListaFavoritos/MinhaLista/styles";

// 🔥 Modal component
const EmailModal = ({ onSave }) => {
  const router = useRouter();
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
          onClick={() => router.replace("/")}
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

const FavoriteList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const fetchData = async (emailParam) => {
    try {
      setLoading(true);

      const email = encodeURIComponent(emailParam);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/favorites/lists/user/${email}`
      );

      if (!res.ok) {
        throw new Error(`Erro HTTP: ${res.status}`);
      }

      const json = await res.json();

      if (json?.success && json?.data?.user) {
        const rawData = json.data;

        const normalizedData = {
          ...rawData,
          lists: Array.isArray(rawData.lists)
            ? rawData.lists.slice(0, 1)
            : rawData.lists
              ? [rawData.lists]
              : [],
        };

        setData(normalizedData);

        localStorage.setItem(
          "userEmail",
          rawData.user.email
        );
      }
    } catch (error) {
      console.error(
        "Erro ao buscar favoritos:",
        error
      );
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  useEffect(() => {
    const storedEmail =
      localStorage.getItem("userEmail");

    if (!storedEmail) {
      setShowModal(true);
      setLoading(false);
      setInitialized(true);
      return;
    }

    fetchData(storedEmail);
  }, []);

  const handleEmailSave = (email) => {
    setShowModal(false);
    fetchData(email);
  };

  if (!initialized) {
    return null;
  }

  return (
    <div className="my-favorite-list">
      {showModal && (
        <EmailModal onSave={handleEmailSave} />
      )}

      {!showModal && !loading && (
        <>
          <FavoriteHeader>
            <FavoriteHeaderTitle>
              Lista de Favoritos
            </FavoriteHeaderTitle>
          </FavoriteHeader>

          <FavoriteListForm data={data} />

          <NewContactSection />
          <NewsletterFooter />
        </>
      )}
    </div>
  );
};

FavoriteList.hideNewContactSection = true;

export default FavoriteList;