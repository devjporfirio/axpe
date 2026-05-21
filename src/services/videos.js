const BACKEND_CONFIG = process.env.config;

const getBackendUrl = () =>
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  (BACKEND_CONFIG && BACKEND_CONFIG.apiUrl) ||
  '';

const parseJsonResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';

  if (!response.ok || !contentType.includes('application/json')) {
    throw new Error(`Invalid video API response: ${response.status} ${response.url}`);
  }

  return response.json();
};

const apiFetch = (path) =>
  fetch(`${getBackendUrl()}${path}`).then(parseJsonResponse);

export default {
  async getVideoHome() {
    const response = await apiFetch('/videos/home');
    return response;
  },
  async getVideoById(videoId) {
    const response = await apiFetch(`/videos/${videoId}`);
    return response;
  },
};
