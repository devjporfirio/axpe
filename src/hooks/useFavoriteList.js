import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function useFavoriteList(id, initial) {
  const router = useRouter();

  const [listName, setListName] = useState(initial?.nome || "");
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataReady, setDataReady] = useState(Boolean(initial));
  const [isOwner, setIsOwner] = useState(false);

  const originalNameRef = useRef(initial?.nome || "");
  const isOwnerRef = useRef(false);
  const savingNameRef = useRef(false);
  const deletingRef = useRef(false);

  const getUserEmail = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("userEmail");
  };

  useEffect(() => {
    isOwnerRef.current = isOwner;
  }, [isOwner]);

  useEffect(() => {
    const handleRemove = (event) => {
      const removeId = event?.detail?.id;
      if (!removeId || !isOwnerRef.current) return;
      setItems((prev) => prev.filter((item) => item?.id !== removeId));
    };

    window.addEventListener("removeToFavoriteList", handleRemove);
    return () => window.removeEventListener("removeToFavoriteList", handleRemove);
  }, []);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    const { signal } = controller;

    const run = async () => {
      try {
        setLoading(true);

        if (typeof window !== "undefined") {
          localStorage.setItem("listId", id);
        }

        const [listRes, itemsRes] = await Promise.all([
          fetch(`${BASE_URL}/favorites/lists/${id}`, { signal }),
          fetch(`${BASE_URL}/favorites/lists/${id}/items`, { signal }),
        ]);

        const [listJson, itemsJson] = await Promise.all([
          listRes.json(),
          itemsRes.json(),
        ]);

        if (listJson?.success && listJson?.data?.list) {
          const list = listJson.data.list;
          const name = list?.nome_da_lista || list?.name || "";
          setListName(name);
          originalNameRef.current = name;

          const ownerEmail = listJson?.data?.user?.email;
          const userEmail = getUserEmail();
          setIsOwner(!!ownerEmail && ownerEmail === userEmail);
        }

        if (itemsJson?.success) {
          const rawItems = itemsJson.data || [];
          const buildings = await Promise.all(
            rawItems.map(async (item) => {
              if (!item?.referencia) return null;
              try {
                const res = await fetch(`${BASE_URL}/building/${item.referencia}`, { signal });
                const json = await res.json();
                return json?.building || null;
              } catch {
                return null;
              }
            })
          );
          if (!signal.aborted) {
            setItems(buildings.filter(Boolean));
          }
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Erro ao carregar dados:", error);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
          setDataReady(true);
        }
      }
    };

    run();
    return () => controller.abort();
  }, [id]);

  const updateListName = useCallback(
    async (newName) => {
      const trimmed = newName.trim();
      if (!trimmed || trimmed === originalNameRef.current) return;
      if (savingNameRef.current) return;

      savingNameRef.current = true;
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/favorites/lists/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome_da_lista: trimmed }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message);
        originalNameRef.current = trimmed;
        setListName(trimmed);
      } catch (error) {
        console.error(error);
        setListName(originalNameRef.current);
      } finally {
        setLoading(false);
        savingNameRef.current = false;
      }
    },
    [id]
  );

  const handleDeleteList = useCallback(async () => {
    if (!id || deletingRef.current) return;

    deletingRef.current = true;
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/favorites/lists/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message);
      localStorage.removeItem("listId");
      router.replace("/lista-de-favoritos");
    } catch (error) {
      console.error("Erro ao deletar lista:", error);
    } finally {
      setLoading(false);
      deletingRef.current = false;
    }
  }, [id, router]);

  return {
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
  };
}
