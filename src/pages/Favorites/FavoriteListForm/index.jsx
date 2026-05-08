"use client";

import React, { useState, useEffect } from "react";
import FavoriteFillIcon from "assets/favoritos.svg";
import SVG from "react-inlinesvg";
import { useRouter } from "next/router";

import { FavoriteSearchContainer } from "./styles";

const slugify = (text) => text?.toLowerCase().trim().replace(/\s+/g, "-");

const FavoriteListForm = ({ data }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const list = data?.lists?.[0];

    if (list?.id) {
      const slug = slugify(list?.nome_da_lista || "lista");

      router.push(
        `/minha-lista-de-favoritos/${list.id}/${slug}`,
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
        const slug = slugify(
          existingList.nome_da_lista || "lista",
        );

        router.push(
          `/minha-lista-de-favoritos/${existingList.id}/${slug}`,
        );

        return;
      }

      const list = await createList(email, name);

      if (!list?.id) {
        console.error("Lista não criada");
        return;
      }

      const listId = list.id;

      const slug = slugify(name);

      const imovelId =
        typeof window !== "undefined"
          ? localStorage.getItem("favorite_item_add")
          : null;

      if (imovelId) {
        const payload = {
          id_lista: listId,
          id_imovel: imovelId,
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

      router.push(
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
        Sua lista de favoritos está esperando por você
      </h4>

      <form onSubmit={handleSubmit} className="search-component-favorite-form">
        <label className="search-component-favorite-label">
          Comece dando um nome a ela
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Minha lista de desejos"
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