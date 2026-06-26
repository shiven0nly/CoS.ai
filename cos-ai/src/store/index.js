import { configureStore } from '@reduxjs/toolkit';
import aiReducer from '../features/aiAssistant/slices/aiSlice';
import authReducer from '../features/auth/slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    aiAssistant: aiReducer,
  },
});

