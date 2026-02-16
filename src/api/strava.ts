import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

// Add axios interceptors for better error logging
api.interceptors.request.use(config => {
  console.log(`Starting Request: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    if (error.response?.status === 404) {
      console.warn('API endpoint not found. Check if the backend is running and routes are mounted.');
    }
    return Promise.reject(error);
  }
);

export const getActivities = (startDate?: string, endDate?: string) => {
  return api.get('/activities', { params: { startDate, endDate } })
}

export const getSummary = (startDate?: string, endDate?: string) => {
  return api.get('/activities/summary', { params: { startDate, endDate } })
}

export const loginWithStrava = () => {
  window.location.href = 'http://localhost:3000/api/auth/login'
}
