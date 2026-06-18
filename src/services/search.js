const SEARCH_API_URL = 'https://admin.axpe.com.br/api';
const BACKEND_CONFIG = process.env.config;

const getBackendUrl = () =>
  (BACKEND_CONFIG && BACKEND_CONFIG.apiUrl) || SEARCH_API_URL;

const parseJsonResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.url}`);
  }

  if (!contentType.includes('application/json')) {
    const body = await response.text();
    throw new Error(
      `API returned non-JSON response: ${response.url} (${contentType}) ${body.slice(0, 80)}`
    );
  }

  return response.json();
};

const apiFetch = (path) =>
  fetch(`${getBackendUrl()}${path}`).then(parseJsonResponse);

export default {
  async getLocals(complete) {
    const response = await apiFetch('/building/locals')
      .then((json) => (complete ? json : json.data));
    return response;
  },
  async getCategories() {
    const response = await apiFetch('/building/categories')
      .then((json) => (json.data ? json.data : null));
    return response;
  },
  async getUses() {
    const response = await apiFetch('/building/types')
      .then((json) => (json.data ? json.data : null));
    return response;
  },
  async getFilters(params) {
    const response = await apiFetch(`/buildings/filters${params}`);
    return response;
  },
  async getBuildings(params) {
    const response = await apiFetch(`/buildings/find${params}`);
    return response;
  },
};
