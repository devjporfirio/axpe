export const parseJsonResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';

  if (!response.ok) {
    const error = new Error(`API request failed: ${response.status} ${response.url}`);
    error.status = response.status;
    error.retryAfter = Number(response.headers.get('retry-after')) || null;
    throw error;
  }

  if (!contentType.includes('application/json')) {
    const body = await response.text();
    throw new Error(
      `API returned non-JSON response: ${response.url} (${contentType}) ${body.slice(0, 80)}`
    );
  }

  return response.json();
};
