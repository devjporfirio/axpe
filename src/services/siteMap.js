export default {
  async getPage() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/sitemap`,
    ).then((response) => response.json());
    return response;
  },
  async getFavoriteLists() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/favorites/lists/sitemap`,
      ).then((response) => response.json());

      return response?.data || [];
    } catch (error) {
      console.error('Erro ao buscar listas de favoritos para o sitemap:', error);
      return [];
    }
  },
};
