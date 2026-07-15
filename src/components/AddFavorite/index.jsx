import React, { useState, useEffect } from "react";
import SVG from "react-inlinesvg";

import FavoriteOutlineIcon from "assets/favorite-outline-icon.svg";
import FavoriteFillIcon from "assets/favoritos.svg";

import { useRouter } from "next/router";

import FavoriteEmailModal from "components/FavoriteEmailModal";

import {
  ToastContainer,
  ToastWrapper,
  ToastContent,
  ToastLink,
  ToastClose,
} from "./styles";

const AddFavorite = ({ id, shelf = false }) => {
  const [isFavorite, setIsFavorite] =
    useState(false);

  const [showToast, setShowToast] =
    useState(false);

  const [showEmailModal, setShowEmailModal] =
    useState(false);

  const [owner, setOwner] =
    useState(false);

  const [sharedListId, setSharedListId] =
    useState(null);

  const [myListId, setMyListId] =
    useState(null);

  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL;

  const router = useRouter();

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const email =
          typeof window !== "undefined"
            ? localStorage.getItem(
                "userEmail"
              )
            : null;

        // lista compartilhada (da página)
        let sharedId =
          typeof window !== "undefined"
            ? localStorage.getItem(
                "listId"
              )
            : null;

        let sharedOwnerEmail = null;

        // busca a lista do usuário logado
        let userListId = null;

        if (email) {
          const myListRes =
            await fetch(
              `${baseUrl}/favorites/lists/user/${email}`
            );

          const myListJson =
            await myListRes.json();

          const myList =
            myListJson?.data?.lists?.[0];

          userListId = myList?.id;

          if (userListId) {
            setMyListId(userListId);
          }
        }

        // busca info da lista compartilhada
        let sharedImoveis = [];

        if (sharedId) {
          const sharedRes =
            await fetch(
              `${baseUrl}/favorites/lists/${sharedId}`
            );

          const sharedJson =
            await sharedRes.json();

          sharedImoveis =
            sharedJson?.data?.imoveis ||
            [];

          sharedOwnerEmail =
            sharedJson?.data?.user
              ?.email;

          setSharedListId(sharedId);
        }

        const isOwnerUser =
          email &&
          sharedOwnerEmail &&
          email ===
            sharedOwnerEmail;

        setOwner(isOwnerUser);

        let favoriteExists = false;

        // DONO → verifica na lista compartilhada
        if (isOwnerUser) {
          favoriteExists =
            sharedImoveis.some(
              (item) =>
                Number(item.id_imovel) ===
                Number(id)
            );
        }
        // VISITANTE → verifica na lista dele
        else if (userListId) {
          const myListDetailRes =
            await fetch(
              `${baseUrl}/favorites/lists/${userListId}`
            );

          const myListDetailJson =
            await myListDetailRes.json();

          const myImoveis =
            myListDetailJson?.data
              ?.imoveis || [];

          favoriteExists =
            myImoveis.some(
              (item) =>
                Number(item.id_imovel) ===
                Number(id)
            );
        }

        setIsFavorite(
          favoriteExists
        );
      } catch (err) {
        console.error(err);
      }
    };

    checkFavorite();
  }, [id, baseUrl]);

  const handleToggleFavorite =
    async () => {
      const email =
        typeof window !==
        "undefined"
          ? localStorage.getItem(
              "userEmail"
            )
          : null;

      if (!email) {
        localStorage.setItem(
          "favorite_item_add",
          id
        );

        setShowEmailModal(true);

        return;
      }

      const targetListId =
        owner
          ? sharedListId
          : myListId;

      if (!targetListId) {
        console.error(
          "Nenhuma lista encontrada."
        );

        return;
      }

      try {
        const payload = {
          id_lista:
            targetListId,
          id_imovel: id,
        };

        let response;

        if (isFavorite) {
          response =
            await fetch(
              `${baseUrl}/favorites/items`,
              {
                method:
                  "DELETE",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify(
                  payload
                ),
              }
            );
        } else {
          response =
            await fetch(
              `${baseUrl}/favorites/items`,
              {
                method:
                  "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify(
                  payload
                ),
              }
            );
        }

        // evita quebrar no 409
        if (
          response.status ===
          409
        ) {
          setIsFavorite(true);
          return;
        }

        if (!response.ok)
          return;

        const nextFavoriteState =
          !isFavorite;

        setIsFavorite(
          nextFavoriteState
        );

        setShowToast(true);

        // só remove visualmente
        // para o dono
        if (
          shelf &&
          owner &&
          !nextFavoriteState &&
          window.location.pathname.includes(
            "/minha-lista-de-favoritos/"
          )
        ) {
          window.dispatchEvent(
            new CustomEvent(
              "removeToFavoriteList",
              {
                detail: {
                  id,
                },
              }
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    if (showToast) {
      const timer =
        setTimeout(() => {
          setShowToast(false);
        }, 3000);

      return () =>
        clearTimeout(timer);
    }
  }, [showToast]);

  const Icon = () => (
    <SVG
      src={
        isFavorite
          ? FavoriteFillIcon
          : FavoriteOutlineIcon
      }
      className={
        isFavorite
          ? "search-component-favorite-fill-icon"
          : "search-component-favorite-outline-icon"
      }
      style={{
        transform:
          isFavorite
            ? "scale(1.3)"
            : "scale(1)",
        position:
          isFavorite
            ? "relative"
            : "static",
        top: isFavorite
          ? "3px"
          : "0",
        right:
          isFavorite
            ? "3px"
            : "0",
        transition:
          "transform 0.2s ease",
      }}
    />
  );

  return (
    <>
      <div
        onMouseDown={(e) => {
          if (shelf) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        onClick={(e) => {
          if (shelf) {
            e.preventDefault();
            e.stopPropagation();
          }

          handleToggleFavorite();
        }}
        style={{
          cursor: "pointer",
          ...(shelf && {
            position:
              "relative",
            height: "0",
            display:
              "flex",
            justifyContent:
              "flex-end",
            top: "8px",
          }),
        }}
      >
        <Icon />
      </div>

      {showEmailModal && (
        <FavoriteEmailModal
          onSave={() => {
            setShowEmailModal(false);
            router.push("/lista-de-favoritos");
          }}
          onClose={() => setShowEmailModal(false)}
        />
      )}

      {showToast && (
        <ToastContainer>
          <ToastWrapper>
            <ToastContent>
              <Icon />

              <p>
                {!owner &&
                !myListId
                  ? "Faça login para salvar seus favoritos"
                  : isFavorite
                    ? "Imóvel adicionado aos favoritos"
                    : "Imóvel removido dos favoritos"}
              </p>

              {!owner &&
              !myListId ? null : (
                <ToastLink href="/lista-de-favoritos">
                  Meus favoritos
                </ToastLink>
              )}
            </ToastContent>

            <ToastClose
              onClick={() =>
                setShowToast(
                  false
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4.5 18.8407L18.5 5.15881"
                  stroke="#3F5A5E"
                />

                <path
                  d="M18.1953 19L4.49959 5"
                  stroke="#3F5A5E"
                />
              </svg>
            </ToastClose>
          </ToastWrapper>
        </ToastContainer>
      )}
    </>
  );
};

export default AddFavorite;