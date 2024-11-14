import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fundraisers: [],
};

export const Fundslice = createSlice({
  name: 'fundraiser',
  initialState,
  reducers: {
    addFundraiser: (state, action) => {
      state.fundraisers.push(action.payload);
    },
  },
});

export const { addFundraiser } = Fundslice.actions;
export default Fundslice.reducer;
