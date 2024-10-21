import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import MiniCardsList from '../../components/MiniCardsList/MiniCardsList';
import { NavLink } from 'react-router-dom';

import './Media-SavedRecipes.css';





export const SavedRecipes = () => {
    const userData = useSelector(state => state.auth.data);
    const userStatus = useSelector(state => state.auth);
    const isUserLoading = userStatus.status === 'loading';


    return (
        <div className="">
            <div className='headlines'>
                <h2 className='my-profile_text activ-a'>
                    Сохраненные рецепты
                </h2>
                <NavLink to="/my-recipes">
                    <h2 className='my-profile_text'>
                        Мои рецепты
                    </h2>
                </NavLink>
            </div>


            {isUserLoading ? ('') : ( <MiniCardsList idUser={userData._id}/> )}
        </div>
    );
  };