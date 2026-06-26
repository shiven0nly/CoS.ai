import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import aiService from '../services/aiService';

const initialState = {
  orchestration: null,
  crisisPlan: null,
  dailySchedule: null,
  rankedPriorities: null,
  coachMessage: null,
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

export const generateDailySchedule = createAsyncThunk(
  'aiAssistant/generateSchedule',
  async (schedulePayload, thunkAPI) => {
    try {
      return await aiService.generateSchedule(schedulePayload);
    } catch (error) {
      const message = error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchRankedPriorities = createAsyncThunk(
  'aiAssistant/rankPriorities',
  async (priorityPayload, thunkAPI) => {
    try {
      return await aiService.rankPriorities(priorityPayload);
    } catch (error) {
      const message = error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchCoachingAdvice = createAsyncThunk(
  'aiAssistant/coach',
  async (coachPayload, thunkAPI) => {
    try {
      return await aiService.productivityCoach(coachPayload);
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
      state.dailySchedule = null;
      state.rankedPriorities = null;
      state.coachMessage = null;
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
      })
      // Generate Schedule
      .addCase(generateDailySchedule.pending, (state) => {
        state.isGenerating = true;
      })
      .addCase(generateDailySchedule.fulfilled, (state, action) => {
        state.isGenerating = false;
        state.dailySchedule = action.payload.schedulePlan;
      })
      .addCase(generateDailySchedule.rejected, (state, action) => {
        state.isGenerating = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Priority Engine
      .addCase(fetchRankedPriorities.pending, (state) => {
        state.isGenerating = true;
      })
      .addCase(fetchRankedPriorities.fulfilled, (state, action) => {
        state.isGenerating = false;
        state.rankedPriorities = action.payload.priorityEngine;
      })
      .addCase(fetchRankedPriorities.rejected, (state, action) => {
        state.isGenerating = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Productivity Coach
      .addCase(fetchCoachingAdvice.pending, (state) => {
        state.isGenerating = true;
      })
      .addCase(fetchCoachingAdvice.fulfilled, (state, action) => {
        state.isGenerating = false;
        state.coachMessage = action.payload.coachingMessage;
      })
      .addCase(fetchCoachingAdvice.rejected, (state, action) => {
        state.isGenerating = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { resetAI } = aiSlice.actions;
export default aiSlice.reducer;
