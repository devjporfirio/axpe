import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import SVG from "react-inlinesvg";

import Share from "components/Share";
import NewsletterFooter from "components/NewsletterFooter";
import NewContactSection from "components/NewContactSection";
import BuildingList from "components/Building/List";

import FavoriteFillIcon from "assets/favoritos.svg";
import ShareIconSVG from "assets/icons/share.svg";
import DeleteListIcon from "assets/delete-list.svg";
import EditIcon from "assets/icons/edit.svg";

import {
  FavoriteHeader,
  FavoriteHeaderTitle,
  FavoriteHeaderTitleContainer,
  ShareButtonContainer,
  FavoriteOptions,
  RemoveList,
  FavoriteListName,
  FavoriteEditIcon,
  FavoriteListContainer,
  FavoriteListContext,
  FavoriteListHeaderTexts,
} from "../../../styles/my-favorites";

import { SimilarBuildings, SimilarBuildingsList } from "pages/Building/styles";
import { useFavoriteList } from "../../../src/hooks/useFavoriteList";
import Head from "next/head";

const BASE_URL_BACK = process.env.NEXT_PUBLIC_BACKEND_URL;
const BASE_URL_FRONT = process.env.NEXT_PUBLIC_SITE_URL || "https://www.axpe.com.br";

const DEFAULT_META = {
  title: "Minha lista de favoritos | Axpe",
  description: "Confira esta lista de imóveis favoritos selecionados na Axpe.",
};

const MyFavoriteList = ({ initialList, meta }) => {
  const router = useRouter();
  const { id, nome } = router.query;
  const { id, nome } = router.query;

  const [shareActive, setShareActive] = useState(false);
  const toggleShare = useCallback(() => setShareActive((prev) => !prev), []);

  const {
    listName,
    setListName,
    isEditing,
    setIsEditing,
    items,
    loading,
    dataReady,
    isOwner,
    updateListName,
    handleDeleteList,
  } = useFavoriteList(router.isReady ? id : undefined, initialList);

  const handleBlur = () => {
    setIsEditing(false);
    updateListName(listName);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsEditing(false);
      updateListName(listName);
    }
  };

  if (!dataReady) {
    return (
      <>
        <Head>
          <meta name="robots" content="index,follow" />
        </Head>

        <div
          style={{
            padding: 20,
            height: "100vh",
          }}
        >
          Carregando lista...
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{meta?.title ?? DEFAULT_META.title}</title>
        <meta
          name="description"
          content={meta?.description ?? DEFAULT_META.description}
        />
        <meta name="robots" content="index,follow" />
        <link
          rel="canonical"
          href={`${BASE_URL_FRONT}/minha-lista-de-favoritos/${id}/${initialList?.slug || nome}`}
        />
      </Head>

      <div className="my-favorite-list">
        <FavoriteHeader>
          <FavoriteHeaderTitle>
            <FavoriteHeaderTitleContainer>
              <SVG src={FavoriteFillIcon} />
              Minha lista de favoritos
            </FavoriteHeaderTitleContainer>
          </FavoriteHeaderTitle>

          <FavoriteOptions className="favorite-options">
            <ShareButtonContainer onClick={toggleShare}>
              Compartilhar lista
              <SVG src={ShareIconSVG} />
            </ShareButtonContainer>

            {isOwner && (
              <RemoveList onClick={handleDeleteList} disabled={loading}>
                Deletar
                <SVG src={DeleteListIcon} />
              </RemoveList>
            )}
          </FavoriteOptions>
        </FavoriteHeader>

        <FavoriteListContainer>
          <FavoriteHeaderTitleContainer>
            <SVG
              src={FavoriteFillIcon}
              className="search-component-favorite-fill-icon"
            />
              Minha lista de favoritos
          </FavoriteHeaderTitleContainer>
          <FavoriteListHeaderTexts>
            {isEditing && isOwner ? (
              <input
                autoFocus
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <FavoriteListName>
                <p>{listName || "Minha lista"}</p>
                {isOwner && (
                  <FavoriteEditIcon onClick={() => setIsEditing(true)}>
                    <SVG src={EditIcon} />
                  </FavoriteEditIcon>
                )}
              </FavoriteListName>
            )}

            <FavoriteOptions className="favorite-options">
              <ShareButtonContainer onClick={toggleShare}>
                Compartilhar lista
                <SVG src={ShareIconSVG} />
              </ShareButtonContainer>

              {isOwner && (
                <RemoveList onClick={handleDeleteList} disabled={loading}>
                  Deletar
                  <SVG src={DeleteListIcon} />
                </RemoveList>
              )}
            </FavoriteOptions>

            {items.length === 0 && (
              <FavoriteListContext>
                Navegue pelo site e clique no coração laranja nos imóveis que
                gostar para adicioná-los. Você também pode compartilhar sua lista
                com quem quiser. Para acessar sua lista use o menu e clique em
                Lista de Favoritos.
              </FavoriteListContext>
            )}
          </FavoriteListHeaderTexts>

          {items.length > 0 ? (
            <SimilarBuildings fullWidth className="similar-buildings">
              <SimilarBuildingsList>
                {items.map((item, index) => (
                  <BuildingList
                    layout="horizontal"
                    item={item}
                    page="building"
                    positionIndex={index + 1}
                    key={`building-${item?.id || index}`}
                  />
                ))}
              </SimilarBuildingsList>
            </SimilarBuildings>
          ) : (
            <>
              <picture>
                <source media="(max-width: 768px)" srcSet="/static/bg-stores-image-mob.png" />
                <source media="(min-width: 769px)" srcSet="/static/bg-stores-image.png" />
                <img
                  src="/static/bg-stores-image.png"
                  alt="Background disabled stores"
                  className="bg-store-image"
                  style={{ width: "100%", height: "auto" }}
                />
              </picture>
            </>
          )}
        </FavoriteListContainer>
      </div>

      <Share
        active={shareActive}
        path={router.asPath}
        title={listName || "Minha lista de favoritos"}
        onClose={() => setShareActive(false)}
      />

      <NewContactSection />
      <NewsletterFooter />
    </>
  );
};

MyFavoriteList.hideNewContactSection = true;

async function fetchList(id) {
  try {
    const res = await fetch(`${BASE_URL_BACK}/favorites/lists/${id}`);
    const json = await res.json();
    return res.ok && json?.success && json?.data?.list ? json.data.list : null;
  } catch (error) {
    return null;
  }
}

export async function getServerSideProps({ params }) {
  const { id } = params;

  let list = await fetchList(id);

  if (!list) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    list = await fetchList(id);
  }

  if (!list) {
    return { props: { initialList: null, meta: null } };
  }

  const nome = list.nome_da_lista || "Minha lista de favoritos";
  const title = list.meta_title || `${nome} | Axpe`;
  const description =
    list.meta_description ||
    `Confira "${nome}", uma lista de imóveis favoritos selecionados na Axpe.`;

  return {
    props: {
      initialList: {
        nome: list.nome_da_lista || "",
        slug: list.slug || "",
      },
      meta: { title, description },
    },
  };
}

export default MyFavoriteList;
