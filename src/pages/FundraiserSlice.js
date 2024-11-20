// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getFundraisers, createFundraiser } from './FundraiserAPI';


// export const fetchFundraisers = createAsyncThunk('fundraiser/fetchFundraisers', async () => {
//     return await getFundraisers();
// });

// export const addFundraiser = createAsyncThunk('fundraiser/addFundraiser', async (fundraiserData) => {
//     await createFundraiser(fundraiserData);
//     return fundraiserData;
// });

// const fundraiserSlice = createSlice({
//     name: 'fundraiser',
//     initialState: { list: [], status: null },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchFundraisers.fulfilled, (state, action) => {
//                 state.list = action.payload;
//             })
//             .addCase(addFundraiser.fulfilled, (state, action) => {
//                 state.list.push(action.payload);
//             });
//     },
// });

// export default fundraiserSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFundraisers, createFundraiser, processDonation } from './FundraiserAPI';

export const fetchFundraisers = createAsyncThunk(
  'fundraiser/fetchFundraisers', 
  async () => await getFundraisers()
);

export const addFundraiser = createAsyncThunk(
  'fundraiser/addFundraiser', 
  async (fundraiserData) => {
    await createFundraiser(fundraiserData);
    return fundraiserData;
  }
);

export const makeDonation = createAsyncThunk(
  'fundraiser/makeDonation',
  async (donationData, { dispatch }) => {
    const response = await processDonation(donationData);
    
    // Optionally refetch fundraisers to update the list
    dispatch(fetchFundraisers());
    
    return response;
  }
);

const fundraiserSlice = createSlice({
  name: 'fundraiser',
  initialState: { list: [], status: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFundraisers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addFundraiser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(makeDonation.fulfilled, (state, action) => {
        // Handle donation success if needed
      });
  },
});

export default fundraiserSlice.reducer;