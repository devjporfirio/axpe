import { parseJsonResponse } from './apiClient';

const isTransientNetworkError = (error) =>
  ['ECONNRESET', 'ETIMEDOUT', 'ECONNREFUSED'].includes(error?.cause?.code || error?.code);

const fetchJsonWithRetry = async (url, attempts = 3) => {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url);
      return await parseJsonResponse(response);
    } catch (error) {
      if (attempt === attempts || !isTransientNetworkError(error)) throw error;
      await new Promise((resolve) => setTimeout(resolve, 150 * attempt));
    }
  }
};

export default {
  async getPage(slug) {
    return fetchJsonWithRetry(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/landing-pages/${slug}`,
    );
  },
};
