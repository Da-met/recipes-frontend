import { configureStore } from "@reduxjs/toolkit";
import { recipesReducer } from "./slices/recipe";
import { authReducer } from "./slices/auth";
import { commentsReducer } from "./slices/comment";
import { saveRecipesReducer } from "./slices/saveRecipes";
import { userBlockReducer } from "./slices/userBlock";
import axios from "../axios";
import { subscriptionsListReducer } from "./slices/subscriptions";



const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        auth: authReducer,
        comments: commentsReducer,
        saveRecipes: saveRecipesReducer,
        userBlock: userBlockReducer,
        subscriptions: subscriptionsListReducer
    }
});

export default store;