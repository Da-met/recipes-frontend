import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { fetchAuthMe, fetchAuth, logout } from '../../redux/slices/auth';
import MiniCardsList from '../../components/MiniCardsList/MiniCardsList';

// import './MyProfile.css';
// import { SkeletonMyProfile } from './SkeletonMyProfile';
import { fetchMyRecipes } from '../../redux/slices/recipe';


export const MyRecipes = () => {
    const userData = useSelector(state => state.auth.data);
    const userStatus = useSelector(state => state.auth);
    const isUserLoading = userStatus.status === 'loading';

  
    return (
        <>
            <div className='headlines'>
                <NavLink to="/my-saved-recipes">
                    <h2 className='my-profile_text'>
                        Сохраненные рецепты
                    </h2>
                </NavLink>
                <h2 className='my-profile_text activ-a'>
                    Мои рецепты
                </h2>
            </div>
            {isUserLoading ? ('') : ( <MiniCardsList idUser={userData._id}/> )} 
        </>
    );
}