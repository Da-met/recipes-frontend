import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
    const { data } = await axios.get('/recipes')
    return data;
})

export const fetchRemoveRecipes = createAsyncThunk('recipes/fetchRemoveRecipes', async (id) => axios.delete(`/recipes/${id}`),
)

export const fetchRecipesByName = createAsyncThunk('recipes/fetchRecipesByName', async (name) => {
    const { data } = await axios.get(`/recipes-search/${name}`)
    return data;
})

export const fetchRecipesByWords = createAsyncThunk('recipes/fetchRecipesByWords', async (words) => {
    const { data } = await axios.get(`/recipes-search-words/${words}`)
    return data;
})

export const fetchMyRecipes = createAsyncThunk('recipes/fetchMyRecipes', async (id) => {
    const { data } = await axios.get(`/my-profile/${id}`)
    return data;
})

export const fetchMySaveRecipesByFilter = createAsyncThunk('recipes/fetchMySaveRecipesByFilter', async (idAndWords) => {
    const { data } = await axios.get(`/my-saved-recipes/${idAndWords[0]}/${idAndWords[1]}`)
    return data;
})


export const fetchMyRecipesByFilter = createAsyncThunk('recipes/fetchMyRecipesByFilter', async (idAndWords) => {
    const { data } = await axios.get(`/my-create-recipes/${idAndWords[0]}/${idAndWords[1]}`)
    return data;
})


export const fetchSaveRecipes = createAsyncThunk('recipes/fetchSaveRecipes', async (id) => {
    const { data } = await axios.get(`/my-saved-recipes/${id}`)
    return data;
})


export const fetchUserBlockRecipes = createAsyncThunk('recipes/fetchUserBlockRecipes', async (id) => {
    const { data } = await axios.get(`/user-block-recipes/${id}`)
    return data;
})






const initialState = {
    recipes: {
        items: [],
        status: 'loading',
    }
}

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducer: {},
    extraReducers: {
        [fetchRecipes.pending]:(state) => {
            state.recipes.items = []
            state.recipes.status = 'loading'
        },
        [fetchRecipes.fulfilled]:(state, action) => {
            state.recipes.items = action.payload
            state.recipes.status = 'loaded'
        },
        [fetchRecipes.rejected]:(state) => {
            state.recipes.items = []
            state.recipes.status = 'error'
        },


        [fetchRemoveRecipes.pending]:(state, action) => {
            state.recipes.items = state.recipes.items.filter((obj) => obj._id !== action.meta.arg)
        },


        [fetchRecipesByName.pending]:(state) => {
            state.recipes.items = []
            state.recipes.status = 'loading'
        },
        [fetchRecipesByName.fulfilled]:(state, action) => {
            state.recipes.items = action.payload
            state.recipes.status = 'loaded'
        },
        [fetchRecipesByName.rejected]:(state) => {
            state.recipes.items = []
            state.recipes.status = 'error'
        },


        [fetchRecipesByWords.pending]:(state) => {
            state.recipes.items = []
            state.recipes.status = 'loading'
        },
        [fetchRecipesByWords.fulfilled]:(state, action) => {
            state.recipes.items = action.payload
            state.recipes.status = 'loaded'
        },
        [fetchRecipesByWords.rejected]:(state) => {
            state.recipes.items = []
            state.recipes.status = 'error'
        },


        [fetchMyRecipes.pending]:(state) => {
            state.recipes.items = []
            state.recipes.status = 'loading'
        },
        [fetchMyRecipes.fulfilled]:(state, action) => {
            state.recipes.items = action.payload
            state.recipes.status = 'loaded'
        },
        [fetchMyRecipes.rejected]:(state) => {
            state.recipes.items = []
            state.recipes.status = 'error'
        },


        [fetchMySaveRecipesByFilter.pending]:(state) => {
            state.recipes.items = []
            state.recipes.status = 'loading'
        },
        [fetchMySaveRecipesByFilter.fulfilled]:(state, action) => {
            state.recipes.items = action.payload
            state.recipes.status = 'loaded'
        },
        [fetchMySaveRecipesByFilter.rejected]:(state) => {
            state.recipes.items = []
            state.recipes.status = 'error'
        },


        [fetchMyRecipesByFilter.pending]:(state) => {
            state.recipes.items = []
            state.recipes.status = 'loading'
        },
        [fetchMyRecipesByFilter.fulfilled]:(state, action) => {
            state.recipes.items = action.payload
            state.recipes.status = 'loaded'
        },
        [fetchMyRecipesByFilter.rejected]:(state) => {
            state.recipes.items = []
            state.recipes.status = 'error'
        },


        [fetchSaveRecipes.pending]:(state) => {
            state.recipes.items = []
            state.recipes.status = 'loading'
        },
        [fetchSaveRecipes.fulfilled]:(state, action) => {
            state.recipes.items = action.payload
            state.recipes.status = 'loaded'
        },
        [fetchSaveRecipes.rejected]:(state) => {
            state.recipes.items = []
            state.recipes.status = 'error'
        },


        [fetchUserBlockRecipes.pending]:(state) => {
            state.recipes.items = []
            state.recipes.status = 'loading'
        },
        [fetchUserBlockRecipes.fulfilled]:(state, action) => {
            state.recipes.items = action.payload
            state.recipes.status = 'loaded'
        },
        [fetchUserBlockRecipes.rejected]:(state) => {
            state.recipes.items = []
            state.recipes.status = 'error'
        },
        
    },
})

export const recipesReducer = recipesSlice.reducer;
