const API_BASE_URL = "/api";

export async function apiRequest(endpoint, options = {}) {
  await new Promise((resolve) => setTimeout(resolve, 450));

  return {
    ok: true,
    status: 200,
    endpoint: `${API_BASE_URL}${endpoint}`,
    options,
    data: null,
  };
}

export { API_BASE_URL };
