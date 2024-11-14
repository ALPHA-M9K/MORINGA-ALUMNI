import { configureStore } from '@reduxjs/toolkit';
import fundraiserReducer from './Fundslice';



export const store = configureStore({
  reducer: {
    fundraiser: fundraiserReducer,
  },
});
