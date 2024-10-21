import React from "react";
import {  fetchRemoveRecipes  } from '../../redux/slices/recipe';
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import axios from '../../axios';
import { useDispatch, useSelector } from "react-redux";
import MiniCard from "../../components/MiniCard/MiniCard";
import './MiniCardsList.css';
import './Media-MiniCardsList.css';

import { fetchMyRecipes, fetchRecipes, fetchSaveRecipes, fetchUserBlockRecipes } from "../../redux/slices/recipe";
import { FilterRecipes } from "../FilterRecipes/FilterRecipes";
import { fetchAllSaveRecipes } from "../../redux/slices/saveRecipes";
import { fetchEveryComments } from "../../redux/slices/comment"
import { fetchAllSubscribers } from "../../redux/slices/subscriptions"
import { addSavedRecipes } from "../../functions/functions";




function MiniCardsList (props) {
    
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.data);
    const allSavedRecipes = useSelector(state => state.saveRecipes);
    const {comments} = useSelector(state => state.comments);

    const [notificationText, setNotificationText] = React.useState('')

    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, );

    React.useEffect(() => {
        dispatch(fetchEveryComments())
    }, [])

    React.useEffect(() => {
        if (window.location.href.includes('my-recipes')) {
            dispatch(fetchMyRecipes(userData._id))
            setNotificationText('Здесь будут ваши рецепты')
        }
        else if (window.location.href.includes('my-saved-recipes')) {
            dispatch(fetchSaveRecipes(userData._id))
            setNotificationText('Вы пока не сохранили ни одного рецепта (')
        }

        else if (window.location.href.includes('user-block')) {
            dispatch(fetchUserBlockRecipes(props.userBlockId))
            setNotificationText('Пользователь не написал ни одного рецепта (')
        }

        else {
            dispatch(fetchRecipes())
            setNotificationText('Рецепты не найдены')
        }
    }, []);


    let  recipes  = useSelector(state => state.recipes.recipes);  
    const [recipesList, setRecipesList] = React.useState(recipes.items)

    const [currentPage, setCurrentPage] = React.useState(1)
    const [recipesPerPage, setRecipesPerPage] = React.useState(6)
    const lastRecipesIndex = currentPage * recipesPerPage;
    const firstRecipesIndex = lastRecipesIndex - recipesPerPage;
    const currentRecipe = recipesList.slice(firstRecipesIndex, lastRecipesIndex)

    const isDataLoading = useSelector(state => state.auth.status) === 'loaded';
    const isPostsLoaded = useSelector(state => state.recipes.recipes.status) === 'loaded';
    const isSavePostsLoading = allSavedRecipes.saveRecipes.status === 'loaded';
    const isPostsLoading = recipes.status === 'loading';

    
    const myRecipes = recipes.items.length == 0;



    React.useEffect(() => {
        if (isDataLoading == true && userData !== null && !window.location.href.includes('user-block')) {
            dispatch(fetchAllSaveRecipes(userData._id))
            dispatch(fetchAllSubscribers(userData._id))

        } else {
            return
        }
    }, [isDataLoading]);


    React.useEffect(() => {
        if (isPostsLoaded === true) {
            setRecipesList(recipes.items)
        } else {
            return
        }
    }, [isPostsLoaded]);



    // const addSavedRecipes = (id) => {       
    // }

    const deleteSavedRecipes = (id, isEdit) => {

        // if (isEdit == true) {
        //     let idAddRecipe = {
        //         idAddRecipe: id,
        //     }
        //     axios.patch(`/delete-saved-recipes/${userData._id}`, idAddRecipe)
        // }

        if (window.location.href.includes(`/my-saved-recipes`)) {
            setRecipesList(recipesList.filter((it) => it._id !== id))
        }
    }

    //--------------------------------------------------------------
    const deleteRecipe = (id) => {
        if (window.confirm('Вы дейтвительно хотите удалить статью?')) {
          dispatch(fetchRemoveRecipes(id))
        }

        if (window.location.href.includes(`/recipes/${id}`)) {
            navigate(`/`)
        }
        let isEdit = false

        setRecipesList(recipesList.filter((it) => it._id !== id))
        // deleteListOfSavedRecipes(id, isEdit)
    };
    //--------------------------------------------------------------


    const paginate = pageNumber => setCurrentPage(pageNumber)


    return (
        <div>
            {(window.location.href.includes('user-block') ? (<></>) : (<FilterRecipes />))}
            
            {(
                isPostsLoading  ? 
                (<ul className="mini-cards-list" >
                    {[...Array(2)].map(() => (<MiniCard isLoading={true}/>))}
                </ul>)
                : 
            (myRecipes ? (<div className="couldnt-find"><p>{notificationText}</p></div>) : 
                (
                    // isDataLoading &&
                    // isSavePostsLoading && 
                    isPostsLoaded ? 
                (<ul className="mini-cards-list"> 
                    {currentRecipe.map((obj, index) => 
                        (<MiniCard 
                            countCommets={comments.items.filter((i) => i.idReciper == obj._id).length}
                            id={obj._id}
                            key={obj._id}
                            img={obj.img}
                            description={obj.description}
                            products={obj.products}
                            keyWords={obj.keyWords}
                            user={obj.user}
                            time={obj.createdAt}
                            viewsCount={obj.viewsCount}
                            isEditable={userData?._id === obj.user._id}

                            isSave={window.location.href.includes('my-saved-recipes') ? 
                            true : Boolean(allSavedRecipes.saveRecipes.items.find(item => item._id == obj._id))}
                            
                            // editListOfSavedRecipes={addSavedRecipes}
                            deleteListOfSavedRecipes={deleteSavedRecipes}
                            // allSavedRecipes={allSavedRecipes}

                            deleteRecipe={deleteRecipe}
                        />))}
                </ul>) : 
                (<ul className="mini-cards-list">
                    {[...Array(2)].map(() => (<MiniCard isLoading={true}/>))}
                </ul>)
                ))
            )}

            <Pagination 
                recipesPerPage={recipesPerPage}
                totalRecipes={recipesList.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
}

export default MiniCardsList;
