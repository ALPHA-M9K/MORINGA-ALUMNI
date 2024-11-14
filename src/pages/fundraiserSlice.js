import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFundraisers, createFundraiser } from './fundraiserAPI';


export const fetchFundraisers = createAsyncThunk('fundraiser/fetchFundraisers', async () => {
    return await getFundraisers();
});

export const addFundraiser = createAsyncThunk('fundraiser/addFundraiser', async (fundraiserData) => {
    await createFundraiser(fundraiserData);
    return fundraiserData;
});

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
            });
    },
});

export default fundraiserSlice.reducer;
