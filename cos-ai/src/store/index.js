import { configureStore } from '@reduxjs/toolkit';
import aiReducer from '../features/aiAssistant/slices/aiSlice';

export const store = configureStore({
  reducer: {
    aiAssistant: aiReducer
  },
});

