import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';


export const fetchAllSubscribers = createAsyncThunk('subscriptions/fetchAllSubscribers', async (id) => {
    const { data } = await axios.get(`/get-list-sbscr/${id}`)
    return data;
})




const initialState = {
    subscriptions: {
        items: [],
        status: 'loading',
    }
}


const subscriptionsListSlice = createSlice({
    name: 'subscriptions',
    initialState,
    reducer: {},
    extraReducers: {
        [fetchAllSubscribers.pending]:(state) => {
            state.subscriptions.items = []
            state.subscriptions.status = 'loading'
        },
        [fetchAllSubscribers.fulfilled]:(state, action) => {
            state.subscriptions.items = action.payload
            state.subscriptions.status = 'loaded'
        },
        [fetchAllSubscribers.rejected]:(state) => {
            state.subscriptions.items = []
            state.subscriptions.status = 'error'
        },
    },
})

export const subscriptionsListReducer = subscriptionsListSlice.reducer;