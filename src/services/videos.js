export default {
  async getVideoHome() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/home`,
    ).then((response) => response.json());
    return response;
  },
  async getVideoById(videoId) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/${videoId}`,
    ).then((response) => response.json());
    return response;
  },
};
