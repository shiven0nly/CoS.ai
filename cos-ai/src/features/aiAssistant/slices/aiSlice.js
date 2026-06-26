import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import aiService from '../services/aiService';

const initialState = {
  orchestration: null,
  isGenerating: false,
  isError: false,
  message: '',
};

// Request AI Orchestration
export const generateOrchestration = createAsyncThunk(
  'aiAssistant/orchestrate',
  async (aiPayload, thunkAPI) => {
    try {
      return await aiService.orchestrateDay(aiPayload);
    } catch (error) {
      const message = error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const aiSlice = createSlice({
  name: 'aiAssistant',
  initialState,
  reducers: {
    resetAI: (state) => {
      state.isError = false;
      state.isGenerating = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateOrchestration.pending, (state) => {
        state.isGenerating = true;
      })
      .addCase(generateOrchestration.fulfilled, (state, action) => {
        state.isGenerating = false;
        state.orchestration = action.payload.orchestration;
      })
      .addCase(generateOrchestration.rejected, (state, action) => {
        state.isGenerating = false;
        state.isError = true;
        state.message = action.payload;
        state.orchestration = null;
      });
  }
});

export const { resetAI } = aiSlice.actions;
export default aiSlice.reducer;
