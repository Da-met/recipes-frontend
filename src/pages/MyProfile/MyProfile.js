import React from 'react';
import { useState } from 'react';
import axios from '../../axios';
import {  fetchAllSubscribers  } from '../../redux/slices/subscriptions';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { Input } from 'antd';
import { fetchAuthMe, logout } from '../../redux/slices/auth';
import { SkeletonMyProfile } from './SkeletonMyProfile';
import { fetchMyRecipes } from '../../redux/slices/recipe';
import { fetchUserBlock } from '../../redux/slices/userBlock';

import './MyProfile.css';
import './Media-MyProfile.css';



export const MyProfile = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.data);
    const userStatus = useSelector(state => state.auth);
    const navigate = useNavigate();


    React.useEffect(() => {
        dispatch(fetchAuthMe())
    }, [])

    

    
   const isUserLoading = userStatus.status === 'loading';

    React.useEffect(() => {
        if (isUserLoading !== true) {
            dispatch(fetchMyRecipes(userData._id))
            dispatch(fetchAllSubscribers(userData._id))
            
        } else {
            return
        }
    }, [isUserLoading]);

    let numberOfRecipes = useSelector(state => state.recipes.recipes.items.length); 
    let subscrUsers = useSelector(state => state.subscriptions.subscriptions.items);

    const onClickLogout = () => {
        if (window.confirm('Вы действительно хотите выйти?')) {
            dispatch(logout())
            window.localStorage.removeItem('token')
            navigate(`/recipes`)
        }
    };

    


    const [isEditQuote, setIsEditQuote] = useState(true);
    const [quoteText, setQuoteText] = useState('');

    React.useEffect(() => {
        if (userStatus.status === 'loaded') {
            setQuoteText(userData.quote)
        }
    }, [isUserLoading]);

    const editQuote = () => {
        setIsEditQuote(false)
    }

    const andEditQuote = () => {
        let quote = {
            quote: quoteText,
        }
        axios.patch(`/add-user-quote/${userData._id}`, quote)
        setIsEditQuote(true)
    }

    const getUserBlockRecipes = (id) => {     
        dispatch(fetchUserBlock(id))
    }
  

    return (
        <>
            {isUserLoading ? ( <SkeletonMyProfile /> ) : (
                <>
                    <div className='my-profile-shell'>
                        <div className='my-profile-row'>
                            <div className='my-profile'>
                                <div className='my-profile_avatar'>
                                    {/* <img src={userData.avatarUrl}></img> */}
                                    {userData.avatarUrl 
                                        ? (<img src={userData.avatarUrl}></img>) 
                                        : (<img src='https://eurooboi.com/upload/iblock/d1f/d1f5f8d46ba8b71a6a72c22350f53d23.jpg' style={{backgroundColor: 'white'}}></img>)
                                    }
                                </div>
                            </div>
                            
                            <div className='my-profile_block2'>
                                <div className='my-profile_block2-1'>
                                    <div className='my-profile_name'>{userData.fullName}</div>
                                    <div className='my-profile_count'> Кол-во рецептов: {numberOfRecipes}</div>
                                </div>


                                {isEditQuote ? 
                                    (<div className='my-profile__text'>
                                        {/* <div className='my-profile__text-input'>{quoteText}</div> */}
                                        <div className='my-profile__text-input'>{quoteText.length !== 0 ? quoteText 
                                        : <p >. . . Добавьте цитату . . .</p> 
                                        
                                        }</div>
                                        <div className='my-profile__text_mini-btn'>
                                            <Button 
                                                onClick={editQuote} 
                                                icon={<EditOutlined />} />
                                        </div> 
                                    </div>) 
                                    : (<div className='my-profile__text'>
                                            <Input
                                                maxLength="240"
                                                onChange={e => setQuoteText(e.target.value)} 
                                                value={quoteText}
                                                size="large" 
                                                placeholder="Введите текст" 
                                            />
                                            <div className='my-profile__text_mini-btn'>
                                                <Button 
                                                    onClick={andEditQuote} 
                                                    icon={<CheckOutlined />} />
                                            </div>
                                        </div>) }



                            </div>
                        </div>

                        <div className='my-profile_btns'>
                            <NavLink to={`/my-profile/edit/${userData._id}`}>
                                <Button className='my-profile_edit'
                                    size="large" type="text" >Редактировать профиль
                                </Button>
                            </NavLink> 

                            <NavLink to="/my-recipes" className=''>
                                <Button size="large" type="primary" ghost className='my-profile-btn_by_recipes'>
                                    Перейти к моим рецептам
                                </Button>
                            </NavLink>

                            <NavLink to={`/`}>
                                <Button 
                                    className='my-profile_exit'
                                    size="large" type="primary" danger ghost
                                    onClick={onClickLogout}
                                >
                                    Выйти
                                </Button>
                            </NavLink> 
                        </div>

                        <div className='my-profile_subscriptions'>
                            {
                                subscrUsers.length == 0 ? (
                                    <>
                                        <div className='my-profile_subscriptions_text'>Здесь будут ваши подписки :</div>
                                        <div className='my-profile_subscriptions-circle_row'>
                                            <div className='my-profile_subscriptions-circle'></div>
                                            <div className='my-profile_subscriptions-circle'></div>
                                            <div className='my-profile_subscriptions-circle'></div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='my-profile_subscriptions_text'>Мои подписки :</div>
                                        <div className='my-profile_subscriptions-circle_row'>
                                            {subscrUsers.map((it) => (
                                                <NavLink to={`/user-block/${it._id}`} onClick={getUserBlockRecipes(it._id)}>
                                                    <div className='my-profile_subscriptions-circle'>
                                                        <img src={it.avatarUrl}/>
                                                    </div>
                                                </NavLink> 
                                            ))}
                                        </div>
                                    </>
                                )
                            }





                            


                        </div>
                    </div>
                </>
            )}            
        </>
    );
}