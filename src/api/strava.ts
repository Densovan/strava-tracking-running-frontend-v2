import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
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

export const getActivities = (startDate?: string, endDate?: string, page: number = 1, limit: number = 10) => {
  return api.get('/activities', { params: { startDate, endDate, page, limit } })
}

export const getSummary = (startDate?: string, endDate?: string) => {
  return api.get('/activities/summary', { params: { startDate, endDate } })
}

export const getGoals = () => {
  return api.get('/goals')
}

export const createGoal = (goalData: { name: string, targetDistance: number, startDate: string, endDate: string }) => {
  return api.post('/goals', goalData)
}

export const getGoalStatus = (id: number) => {
  return api.get(`/goals/${id}/status`)
}

export const deleteGoal = (id: number) => {
  return api.delete(`/goals/${id}`)
}

export const loginWithStrava = () => {
  window.location.href = import.meta.env.VITE_STRAVA_AUTH_URL || 'http://localhost:3000/api/auth/login'
}
