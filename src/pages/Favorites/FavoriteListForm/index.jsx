"use client";

import React, { useState, useEffect } from "react";
import FavoriteFillIcon from "assets/favoritos.svg";
import SVG from "react-inlinesvg";
import { useRouter } from "next/router";

import { FavoriteSearchContainer } from "./styles";

const FavoriteListForm = ({ data }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const list = data?.lists?.[0];

    if (list?.id) {
      router.replace(
        `/minha-lista-de-favoritos/${list.id}/${list.slug}`,
      );
    }
  }, [data, loading, router]);

  const checkExistingList = async (email) => {
    try {
      const res = await fetch(
        `${baseUrl}/favorites/lists/user/${encodeURIComponent(email)}`,
      );

      const json = await res.json();

      if (!res.ok || !json?.success) return null;

      const lists = Array.isArray(json?.data?.lists)
        ? json?.data?.lists
        : json?.data?.lists
          ? [json?.data?.lists]
          : [];

      return lists.length > 0 ? lists[0] : null;
    } catch (err) {
      console.error("Erro ao buscar lista:", err);
      return null;
    }
  };

  const createList = async (email, name) => {
    const res = await fetch(`${baseUrl}/favorites/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        nome_da_lista: name,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json?.message || "Erro ao criar lista");
    }

    return json?.data?.list;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || loading) return;

    setLoading(true);

    try {
      const email = data?.user?.email;

      if (!email) {
        console.error("Email não encontrado");
        return;
      }

      const existingList = await checkExistingList(email);

      if (existingList?.id) {
        router.replace(
          `/minha-lista-de-favoritos/${existingList.id}/${existingList.slug}`,
        );

        return;
      }

      const list = await createList(email, name);

      if (!list?.id) {
        console.error("Lista não criada");
        return;
      }

      const listId = list.id;
      const slug = list.slug;

      const imovelId =
        typeof window !== "undefined"
          ? localStorage.getItem("favorite_item_add")
          : null;

      if (imovelId) {
        const payload = {
          id_lista: listId,
          id_imovel: imovelId,
          email,
        };

        const response = await fetch(
          `${baseUrl}/favorites/items`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          },
        );

        if (response.ok) {
          localStorage.removeItem("favorite_item_add");
        }
      }

      router.replace(
        `/minha-lista-de-favoritos/${listId}/${slug}`,
      );
    } catch (error) {
      console.error("Erro ao criar lista:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FavoriteSearchContainer>
      <SVG
        src={FavoriteFillIcon}
        className="search-component-favorite-fill-icon"
      />

      <h4 className="search-component-favorite-title">
        Qual nome você quer dar para sua lista de favoritos?
      </h4>

      <form onSubmit={handleSubmit} className="search-component-favorite-form">
        <label className="search-component-favorite-label">
          Depois você pode mudar se quiser
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Coberturas no Itaim"
          className="search-component-favorite-input"
        />

        <button
          type="submit"
          disabled={!name.trim() || loading}
          className="search-component-favorite-submit-button"
        >
          {loading ? "SALVANDO..." : "SALVAR"}
        </button>
      </form>
    </FavoriteSearchContainer>
  );
};

export default FavoriteListForm;