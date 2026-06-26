import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import aiService from '../services/aiService';

const initialState = {
  orchestration: null,
  crisisPlan: null,
  isGenerating: false,
  isError: false,
  message: '',
};

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

export const triggerRescueMode = createAsyncThunk(
  'aiAssistant/rescue',
  async (rescuePayload, thunkAPI) => {
    try {
      return await aiService.triggerRescueMode(rescuePayload);
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
      state.crisisPlan = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Orchestration
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
      })
      // Crisis Rescue Mode
      .addCase(triggerRescueMode.pending, (state) => {
        state.isGenerating = true;
      })
      .addCase(triggerRescueMode.fulfilled, (state, action) => {
        state.isGenerating = false;
        state.crisisPlan = action.payload.crisisPlan;
      })
      .addCase(triggerRescueMode.rejected, (state, action) => {
        state.isGenerating = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { resetAI } = aiSlice.actions;
export default aiSlice.reducer;
