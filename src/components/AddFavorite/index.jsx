import React, { useState, useEffect } from "react";
import SVG from "react-inlinesvg";

import FavoriteOutlineIcon from "assets/favorite-outline-icon.svg";
import FavoriteFillIcon from "assets/favoritos.svg";

import { useRouter } from "next/router";

import {
  ToastContainer,
  ToastWrapper,
  ToastContent,
  ToastLink,
  ToastClose,
} from "./styles";

const AddFavorite = ({ id, shelf = false }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [owner, setOwner] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const router = useRouter();

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        let listId =
          typeof window !== "undefined"
            ? localStorage.getItem("listId")
            : null;

        const email =
          typeof window !== "undefined"
            ? localStorage.getItem("userEmail")
            : null;

        let listOwnerEmail = null;

        if (!listId && email) {
          const res = await fetch(
            `${baseUrl}/favorites/lists/user/${email}`,
          );

          const json = await res.json();

          const list = json?.data?.lists?.[0];

          listId = list?.id;
          listOwnerEmail = list?.email;

          if (listId) {
            localStorage.setItem("listId", listId);
          }
        }

        if (!listId) return;

        const res = await fetch(
          `${baseUrl}/favorites/lists/${listId}`,
        );

        const json = await res.json();

        const imoveis = json?.data?.imoveis || [];

        listOwnerEmail =
          listOwnerEmail || json?.data?.user?.email;

        const exists = imoveis.some(
          (item) => Number(item.id_imovel) === Number(id),
        );

        const isOwner =
          email &&
          listOwnerEmail &&
          email === listOwnerEmail;

        setOwner(isOwner);
        setIsFavorite(exists);
      } catch (err) {
        console.error(err);
      }
    };

    checkFavorite();
  }, [id, baseUrl]);

  const handleToggleFavorite = async () => {
    let listId =
      typeof window !== "undefined"
        ? localStorage.getItem("listId")
        : null;

    const email =
      typeof window !== "undefined"
        ? localStorage.getItem("userEmail")
        : null;

    if (!email || !listId) {
      localStorage.setItem("favorite_item_add", id);

      if (shelf) {
        setShowToast(true);
        return;
      }

      router.push("/lista-de-favoritos");
      return;
    }

    if (!listId) {
      const res = await fetch(
        `${baseUrl}/favorites/lists/user/${email}`,
      );

      const json = await res.json();

      listId = json?.data?.lists?.[0]?.id;

      if (listId) {
        localStorage.setItem("listId", listId);
      }
    }

    try {
      const payload = {
        id_lista: listId,
        id_imovel: id,
      };

      let response;

      if (isFavorite) {
        response = await fetch(
          `${baseUrl}/favorites/items`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          },
        );
      } else {
        response = await fetch(
          `${baseUrl}/favorites/items`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          },
        );
      }

      if (!response.ok) return;

      setIsFavorite((prev) => !prev);
      setShowToast(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const Icon = () => (
    <SVG
      src={isFavorite && owner ? FavoriteFillIcon : FavoriteOutlineIcon}
      className={
        isFavorite
          ? "search-component-favorite-fill-icon"
          : "search-component-favorite-outline-icon"
      }
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
            position: "relative",
            height: "0",
            display: "flex",
            justifyContent: "flex-end",
            top: "8px"
          }),
        }}
      >
        <Icon />
      </div>

      {showToast && (
        <ToastContainer>
          <ToastWrapper>
            <ToastContent>
              <Icon />

              <p>
                {!owner && shelf
                  ? "Faça login para salvar seus favoritos"
                  : isFavorite
                    ? "Imóvel adicionado aos favoritos"
                    : "Imóvel removido dos favoritos"}
              </p>

              {!owner && shelf ? null : (
                <ToastLink href="/lista-de-favoritos">
                  Meus favoritos
                </ToastLink>
              )}
            </ToastContent>

            <ToastClose
              onClick={() => setShowToast(false)}
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