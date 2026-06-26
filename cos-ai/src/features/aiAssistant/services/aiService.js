import axios from 'axios';

const API_URL = 'http://localhost:5000/api/ai/';

axios.defaults.withCredentials = true;

const orchestrateDay = async (payload) => {
  const response = await axios.post(API_URL + 'orchestrate', payload);
  return response.data;
};

const triggerRescueMode = async (payload) => {
  const response = await axios.post(API_URL + 'rescue', payload);
  return response.data;
};

const generateSchedule = async (payload) => {
  const response = await axios.post(API_URL + 'generate-schedule', payload);
  return response.data;
};

const rankPriorities = async (payload) => {
  const response = await axios.post(API_URL + 'rank-priorities', payload);
  return response.data;
};

const productivityCoach = async (payload) => {
  const response = await axios.post(API_URL + 'coach', payload);
  return response.data;
};

const aiService = {
  orchestrateDay,
  triggerRescueMode,
  generateSchedule,
  rankPriorities,
  productivityCoach
};

export default aiService;
