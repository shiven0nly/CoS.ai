import axios from 'axios';

const API_URL = 'http://localhost:5000/api/ai/';

// Configure axios to send cookies with requests automatically
axios.defaults.withCredentials = true;

const orchestrateDay = async (payload) => {
  // payload includes format: { currentTime, deadlines, taskList, estimatedDuration, priority, energyLevel, calendarAvailability }
  const response = await axios.post(API_URL + 'orchestrate', payload);
  return response.data;
};

const aiService = {
  orchestrateDay,
};

export default aiService;
