import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Fetch user profile
export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async () => {
    const response = await api.get('/user/profile');
    return response.data;
});

// Update user profile
export const updateUserProfile = createAsyncThunk('user/updateProfile', async (profileData) => {
    const response = await api.put('/user/profile', profileData);
    return response.data;
});

// Fetch all users for admin panel
export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
    const response = await api.get('/admin/users');
    return response.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
        users: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            });
    }
});

export default userSlice.reducer;
