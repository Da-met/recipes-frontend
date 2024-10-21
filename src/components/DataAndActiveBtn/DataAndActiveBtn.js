import React from "react";
import { useState } from 'react';
import { PlusOutlined, EditOutlined, CloseOutlined, MinusOutlined } from '@ant-design/icons';
import { useNavigate,  NavLink } from "react-router-dom";

import { fetchUserBlock } from '../../redux/slices/userBlock';

import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import axios from '../../axios';
import './DataAndActiveBtn.css';
import { selectIsAuth } from '../../redux/slices/auth';
import {  fetchRemoveRecipes  } from '../../redux/slices/recipe';
import { timeProcessing } from '../../functions/functions.js'
import { fetchAuthMe } from "../../redux/slices/auth.js";
import { fetchAllRecipes } from "../../redux/slices/saveRecipes.js";
import { fetchRemoveAllCommentsByRecipe } from "../../redux/slices/comment.js"

// import img from '../../public/icons/UserAva.jpg';


function DataAndActiveBtn ({user, time, isEditable, id, isSave, setIsSave, editListOfSavedRecipes, deleteListOfSavedRecipes, deleteRecipe }) {
    const userData = useSelector(state => state.auth.data);
    const isAuth = useSelector(selectIsAuth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isSaveOrNot, setIsSaveOrNot] = useState(isSave)

    React.useEffect(() => {
        setIsSaveOrNot(isSave)
    }, [isSave]);
    

    const onClickRemove = () => {
        deleteRecipe(id)
        dispatch(fetchRemoveAllCommentsByRecipe(id))
    };



    const addRecipes = () => {
        // if (!window.location.href.includes(`/recipes/${id}`)) {
        //     editListOfSavedRecipes(id)
        // }
        let idAddRecipe = {
            idAddRecipe: id,
        }
        axios.patch(`/add-saved-recipes/${userData._id}`, idAddRecipe)
        // if (userSavedRecipes.savedRecipes.length === 0 ) {
        //     console.log('было 0 !!!!')
        //     let idAddRecipe = {
        //         idAddRecipe: id,
        //     }
        //     axios.patch(`/add-saved-recipes/${userData._id}`, idAddRecipe)
        //     dispatch(fetchAllRecipes())
        // } else {
        //     console.log('стало 1+')
        //     let idAddRecipe = {
        //         idAddRecipe: [...userSavedRecipes.savedRecipes, id],
        //     }
        //     axios.patch(`/add-saved-recipes/${userData._id}`, idAddRecipe)
        //     dispatch(fetchAllRecipes())
        // }

        // dispatch(fetchAllRecipes())

        // console.log('click fetchAllRecipes')
        // console.log(userSavedRecipes)

        // dispatch(fetchAuthMe())

        // setIsSave(!isSave)
        setIsSaveOrNot(!isSave)
    }


    const deleteRecipes = () => {
        let isEdit = true
        

        if (isEdit == true) {
            let idAddRecipe = {
                idAddRecipe: id,
            }
            axios.patch(`/delete-saved-recipes/${userData._id}`, idAddRecipe)
        }

        // setIsSave(!isSave)
        setIsSaveOrNot(!isSave)

        if (!window.location.href.includes(`/recipes/`)) {
            deleteListOfSavedRecipes(id, isEdit)  
        }
    }


    const getUserBlockRecipes = () => {     
        dispatch(fetchUserBlock(user._id))
    }



    return (
        <div className='mini-card-bot'>
            <NavLink to={`/user-block/${user._id}`} onClick={getUserBlockRecipes}>
                <div className='mini-card-avtor_wrapper'>
                        <div className='mini-card-avatar_user'>
                            {user.avatarUrl 
                                ? (<img src={user.avatarUrl} 
                                    onError={(err) => {
                                        err.currentTarget.src="https://eurooboi.com/upload/iblock/d1f/d1f5f8d46ba8b71a6a72c22350f53d23.jpg";
                                    }}
                                ></img>)    
                                : (<img src='https://eurooboi.com/upload/iblock/d1f/d1f5f8d46ba8b71a6a72c22350f53d23.jpg'></img>)
                            }

                        </div>
                        <div className='mini-card_data-user'>
                            <div className='mini-card_name'>{user.fullName}</div>
                            <div className='mini-card_time'>{timeProcessing(time)}</div>
                        </div>
                </div>
            </NavLink> 
            
            <div className='mini-card-actions'>
                {isAuth 
                    ? (userData._id == user._id ? ('') : ( isSaveOrNot ?
                        (
                        <Button 
                            shape="circle" 
                            icon={<MinusOutlined />} 
                            onClick={deleteRecipes}

                        />) : 
                        (<Button 
                            shape="circle" 
                            icon={<PlusOutlined />} 
                            onClick={addRecipes}
                        />)))
                    : ('')}

                 
                <NavLink to={`/recipes/${id}/edit`}>
                    {isEditable && (<Button shape="circle" icon={<EditOutlined />} />)}
                </NavLink>
                
                {isEditable && (<Button onClick={onClickRemove} shape="circle" type="dashed" danger icon={<CloseOutlined />} />)}
            </div>
        </div>
    )
}

export default DataAndActiveBtn;