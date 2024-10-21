import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';



export const fetchUserBlock = createAsyncThunk('userBlock/fetchUserBlock', async (id) => {
    const { data } = await axios.get(`/user-block/${id}`)
    return data;
})


const initialState = {
    data: null,
    status: 'loading',
};

const userBlockSlice = createSlice({
    name: 'userBlock',
    initialState,
    reducers: {},
    extraReducers: {

        [fetchUserBlock.pending]:(state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchUserBlock.fulfilled]:(state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchUserBlock.rejected]:(state) => {
            state.status = 'error';
            state.data = null;
        },


    },
});

export const userBlockReducer = userBlockSlice.reducer;