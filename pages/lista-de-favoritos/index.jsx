"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import NewsletterFooter from "components/NewsletterFooter";
import NewContactSection from "components/NewContactSection";
import FavoriteEmailModal from "components/FavoriteEmailModal";

import FavoriteListForm from "pages/Favorites/FavoriteListForm";

import {
  FavoriteHeader,
  FavoriteHeaderTitle,
} from "pages/ListaFavoritos/MinhaLista/styles";

import SITE_URL from "helpers/siteUrl";

const baseUrl = SITE_URL;

const FavoriteList = ({ meta }) => {
  const router = useRouter();
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
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`${baseUrl}/lista-de-favoritos`} />
      </Head>

      {showModal && (
        <FavoriteEmailModal
          onSave={handleEmailSave}
          onClose={() => router.replace("/")}
        />
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

export async function getStaticProps() {
  return {
    props: {
      meta: {
        title: "Lista de Favoritos | Axpe",
        description:
          "Monte sua lista de imóveis favoritos na Axpe e volte quando quiser para revisitar suas escolhas.",
      },
    },
  };
}

export default FavoriteList;