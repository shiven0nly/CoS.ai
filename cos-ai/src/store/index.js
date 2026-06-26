import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // We will add slices here later (e.g., auth: authReducer, tasks: taskReducer, etc.)
  },
});
