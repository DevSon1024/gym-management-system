import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor to add the token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

// --- Auth Functions ---
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);

// --- User-Specific Functions ---
export const getMyProfile = () => api.get('/members/me'); // We need to create this route on the backend

// --- Public Functions ---
export const getAllPlans = () => api.get('/plans');
export const getAllTrainers = () => api.get('/trainers');

// --- API Functions for Members ---
export const getMembers = () => api.get('/members');
export const createMember = (memberData) => api.post('/members', memberData);
export const updateMember = (id, memberData) => api.put(`/members/${id}`, memberData);
export const deleteMember = (id) => api.delete(`/members/${id}`);

// --- API Functions for Dashboard ---
export const getDashboardStats = () => api.get('/dashboard/stats');

// --- API Functions for Trainers ---
export const getTrainers = () => api.get('/trainers');
export const createTrainer = (trainerData) => api.post('/trainers', trainerData);
export const updateTrainer = (id, trainerData) => api.put(`/trainers/${id}`, trainerData);
export const deleteTrainer = (id) => api.delete(`/trainers/${id}`);

// --- API Functions for Plans ---
export const getPlans = () => api.get('/plans');
export const createPlan = (planData) => api.post('/plans', planData);
export const updatePlan = (id, planData) => api.put(`/plans/${id}`, planData);
export const deletePlan = (id) => api.delete(`/plans/${id}`);

export default api;