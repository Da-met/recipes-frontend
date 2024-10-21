import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';


export const fetchAllRecipes = createAsyncThunk('saveRecipes/fetchAllRecipes', async () => {
    const { data } = await axios.get('/saved-recipes')
    return data;
})


export const fetchMySaveRecipes = createAsyncThunk('saveRecipes/fetchMySaveRecipes', async (id) => {
    const { data } = await axios.get(`/my-saved-recipes/${id}`)
    return data;
})

export const fetchAllSaveRecipes = createAsyncThunk('saveRecipes/fetchAllSaveRecipes', async (id) => {
    const { data } = await axios.get(`/my-saved-recipes/${id}`)
    return data;
})







const initialState = {
    saveRecipes: {
        items: [],
        status: 'loading',
    }
}


const saveRecipesSlice = createSlice({
    name: 'saveRecipes',
    initialState,
    reducer: {},
    extraReducers: {

        [fetchAllRecipes.pending]:(state) => {
            state.saveRecipes.items = []
            state.saveRecipes.status = 'loading'
        },
        [fetchAllRecipes.fulfilled]:(state, action) => {
            state.saveRecipes.items = action.payload
            state.saveRecipes.status = 'loaded'
        },
        [fetchAllRecipes.rejected]:(state) => {
            state.saveRecipes.items = []
            state.saveRecipes.status = 'error'
        },


        [fetchMySaveRecipes.pending]:(state) => {
            state.saveRecipes.items = []
            state.saveRecipes.status = 'loading'
        },
        [fetchMySaveRecipes.fulfilled]:(state, action) => {
            state.saveRecipes.items = action.payload
            state.saveRecipes.status = 'loaded'
        },
        [fetchMySaveRecipes.rejected]:(state) => {
            state.saveRecipes.items = []
            state.saveRecipes.status = 'error'
        },

        
        [fetchAllSaveRecipes.pending]:(state) => {
            state.saveRecipes.items = []
            state.saveRecipes.status = 'loading'
        },
        [fetchAllSaveRecipes.fulfilled]:(state, action) => {
            state.saveRecipes.items = action.payload
            state.saveRecipes.status = 'loaded'
        },
        [fetchAllSaveRecipes.rejected]:(state) => {
            state.saveRecipes.items = []
            state.saveRecipes.status = 'error'
        },



        
    },
})

export const saveRecipesReducer = saveRecipesSlice.reducer;