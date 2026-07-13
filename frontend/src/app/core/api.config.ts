declare global {
  interface Window {
    __ATHLETIX_CONFIG__?: {
      API_ORIGIN?: string;
    };
  }
}

const configuredOrigin = window.__ATHLETIX_CONFIG__?.API_ORIGIN || 'http://localhost:8080';

export const API_ORIGIN = configuredOrigin.replace(/\/$/, '');
export const API_URL = `${API_ORIGIN}/api`;
