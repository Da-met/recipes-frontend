import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { HeartOutlined, PlusOutlined, MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { selectIsAuth } from '../../redux/slices/auth';
import { RecipeSearch } from "../RecipeSearch/RecipeSearch";

import './Header.css';
import './Media-Header.css';
import MiniMenu from "../MiniMenu/MiniMenu";



function Header() {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const location = useLocation()

    const data = useSelector(state => state.auth.data);
    const [isOpenSearch, setIsOpenSearch] = useState(false)

    const [isMainPage, setIsMainPage] = useState()

    const [miniMenu, setMiniMenu] = useState(false)

    return (
        <>
            <MiniMenu 
                activeOrNot={miniMenu}
                setMiniMenu={setMiniMenu}
            />
            <div className='header'>
                
                {isOpenSearch ? 
                (
                    <div className={`recipe-search ${isOpenSearch ? "active" : ""}`}>
                        <RecipeSearch 
                            setIsOpenSearch={setIsOpenSearch}
                            isOpenSearch={isOpenSearch}
                            dataId={data._id}
                        />
                    </div>
                ) : 
                (
                    <div className="container">
                        <div className='header_nav-row'>
                            <div className='header_general'>
                                <img className="header_logo" src="https://cdn.icon-icons.com/icons2/677/PNG/512/fried-egg_icon-icons.com_60839.png"/>
                                <NavLink to={`/`} className='header_all-recipes'>
                                    <Button 
                                        className={`first-btn_header ${location.pathname == '/' ? "btn_header_blue" : "btn_header_grey"}`} 
                                        type="text" size="large"
                                    >Все рецепты</Button>
                                </NavLink> 

                                <NavLink to={`/`} >
                                    <Button 
                                    className="header-search"
                                    type="text" 
                                    size="large"
                                    onClick={() => setIsOpenSearch(!isOpenSearch)}
                                    > <SearchOutlined /></Button>
                                </NavLink> 
                            </div>
                            

                            <div className='header_common-buttons'>
                                {isAuth ? (
                                    <>
                                        <NavLink to="/create-recipe" className='header-add_recipes'>
                                            <Button
                                            className={`${location.pathname == '/create-recipe' ? "btn_header_blue" : "btn-add_recipes"}`} 
                                            size="large" type="text" 
                                            >Добавить рецепт</Button>
                                        </NavLink>

                                        <NavLink to="/create-recipe" className='header-plus'>
                                            <Button 
                                            className={`${location.pathname == '/create-recipe' ? "btn_header_blue" : "btn-add_recipes"}`} 
                                            size="large" type="text">
                                                <div className='header-row-my_recipes'>
                                                    <PlusOutlined />
                                                </div>
                                            </Button>
                                        </NavLink>

                                        <NavLink to="/my-saved-recipes" className='header-my_recipes-link'>
                                            <Button size="large" type="text" 
                                            className={`${location.pathname == '/my-saved-recipes' || location.pathname == '/my-recipes' ? "btn_header_blue" : "header-my_recipes"}`} >
                                                <div className='header-row-my_recipes'>
                                                    <HeartOutlined />
                                                </div>
                                            </Button>
                                        </NavLink>

                                        <Button size="large" type="text" className='header_mini-menu' 
                                            onClick={() => setMiniMenu(true)}
                                        >
                                            <MenuOutlined />
                                        </Button>

                                        <NavLink to="/my-profile">
                                            <div className={`header-avatar ${location.pathname == '/my-profile' ? "avatar_border" : ""}`}>
                                                {data.avatarUrl 
                                                    ? (<img src={data.avatarUrl}
                                                        onError={(err) => {
                                                            err.currentTarget.src="https://eurooboi.com/upload/iblock/d1f/d1f5f8d46ba8b71a6a72c22350f53d23.jpg";
                                                        }}
                                                        ></img>) 
                                                    : (<img src='https://eurooboi.com/upload/iblock/d1f/d1f5f8d46ba8b71a6a72c22350f53d23.jpg'></img>)
                                                }
                                            </div>
                                        </NavLink>
                                    </>
                                ) : (
                                    <>
                                        <Button size="large" type="text" className='header_mini-menu' 
                                            onClick={() => setMiniMenu(true)}
                                        >
                                            <MenuOutlined />
                                        </Button>

                                        <NavLink to="/login">
                                            <Button className={`${location.pathname == '/login' ? "btn_header_blue" : "btn-login"}`}
                                            type="text" size="large">Войти</Button>
                                        </NavLink>

                                        <NavLink to="/register">
                                            <Button className={`mini-create_ac  ${location.pathname == '/register' ? "btn_header_blue" : "btn-enter"}`}
                                            type="text" ghost size="large">Создать</Button>
                                        </NavLink>
                                        <NavLink to="/register">
                                            <Button className={`max-create_ac  ${location.pathname == '/register' ? "btn_header_blue" : "btn-enter"}`}
                                            type="text" ghost size="large">Создать аккаунт</Button>
                                        </NavLink>
                                    </>
                                )}
                            </div>
                            
                        </div>
                    </div>
                )}
            </div>
            
        </>
    )
}
  
export default Header;