import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { selectIsAuth } from '../../redux/slices/auth';
import { Button } from 'antd';
import './MiniMenu.css';
import { CloseOutlined } from '@ant-design/icons';


function MiniMenu({activeOrNot, setMiniMenu}) {
    const isAuth = useSelector(selectIsAuth);

    return (
        <>
            <div 
                className={activeOrNot ? 'mini-menu_div' : 'none'}
                // className="mini-menu_div"
            >

                <div className="mini-menu_center">
                    <div className="mini-menu_ul">
                        <div><NavLink to={`/`} className=''>
                            <Button type="primary" size="large" ghost
                                onClick={() => setMiniMenu(false)}>
                                Все рецепты
                            </Button>
                        </NavLink></div>
                        
                        {isAuth ? 
                        (<div><NavLink to="/create-recipe" className=''>
                            <Button type="primary" size="large" ghost
                                onClick={() => setMiniMenu(false)}>
                                Добавить рецепт
                            </Button>
                        </NavLink></div>) : ''}
                        
                        {isAuth ? 
                        (<div><NavLink to="/my-saved-recipes" className=''>
                            <Button type="primary" size="large" ghost
                                onClick={() => setMiniMenu(false)}>
                                Сохраненные рецепты
                            </Button>
                        </NavLink></div>) : ''}
                        
                    </div>

                    <div>
                    <Button size="large" ghost
                        className="mini-menu_exit" 
                        icon={<CloseOutlined />} 
                        onClick={() => setMiniMenu(false)} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MiniMenu;
  