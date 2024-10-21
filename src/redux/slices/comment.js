import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';



export const fetchComments = createAsyncThunk('comments/fetchComments', async (id) => {
    const { data } = await axios.get(`/comments/${id}`)
    return data;
})

export const fetchEveryComments = createAsyncThunk('comments/fetchEveryComments', async () => {
    const { data } = await axios.get(`/comments-every`)
    return data;
})

export const fetchRemoveComment = createAsyncThunk('comments/fetchRemoveComment', async (id) => axios.delete(`/comment/${id}`),
)

export const fetchRemoveAllCommentsByRecipe = createAsyncThunk('comments/fetchRemoveAllCommentsByRecipe', async (id) => axios.delete(`/comments/${id}`),
)




const initialState = {
    comments: {
        items: [],
        status: 'loading',
    }
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducer: {},
    extraReducers: {
        [fetchComments.pending]:(state) => {
            state.comments.items = []
            state.comments.status = 'loading'
        },
        [fetchComments.fulfilled]:(state, action) => {
            state.comments.items = action.payload
            state.comments.status = 'loaded'
        },
        [fetchComments.rejected]:(state) => {
            state.comments.items = []
            state.comments.status = 'error'
        },


        [fetchEveryComments.pending]:(state) => {
            state.comments.items = []
            state.comments.status = 'loading'
        },
        [fetchEveryComments.fulfilled]:(state, action) => {
            state.comments.items = action.payload
            state.comments.status = 'loaded'
        },
        [fetchEveryComments.rejected]:(state) => {
            state.comments.items = []
            state.comments.status = 'error'
        },


        
        [fetchRemoveComment.pending]:(state, action) => {
            state.comments.items = state.comments.items.filter((obj) => obj._id !== action.meta.arg)
        },

        [fetchRemoveAllCommentsByRecipe.pending]:(state, action) => {
            state.comments.items = state.comments.items.filter((obj) => obj.
            idReciper !== action.meta.arg)
        },



    },
})

export const commentsReducer = commentsSlice.reducer;