const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001/api';

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    ME: `${API_BASE_URL}/auth/me`,
    UPDATE_PROFILE: `${API_BASE_URL}/auth/profile`,
    SUBSCRIBE: `${API_BASE_URL}/auth/subscribe`,
  },
  JOBS: {
    BASE: `${API_BASE_URL}/jobs`,
    FEED: `${API_BASE_URL}/jobs/feed`,
    MINE: `${API_BASE_URL}/jobs/mine`,
    APPLICANTS: (jobId) => `${API_BASE_URL}/jobs/${jobId}/applications`,
  },
  APPLICATIONS: {
    BASE: `${API_BASE_URL}/applications`,
    MINE: `${API_BASE_URL}/applications/mine`,
    EMPLOYER_RECENT: `${API_BASE_URL}/applications/employer/recent`,
    STATUS: (appId) => `${API_BASE_URL}/applications/${appId}/status`,
  },
  MESSAGES: {
    CONVERSATIONS: `${API_BASE_URL}/messages/conversations`,
    GET_MESSAGES: (targetId) => `${API_BASE_URL}/messages/${targetId}`,
    SEND: `${API_BASE_URL}/messages`,
  }
};

export default API_BASE_URL;
