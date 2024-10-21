import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';

import './RecipeSearch.css';
import { Button, Input } from 'antd';
import { fetchRecipes, fetchRecipesByName, fetchMyRecipes } from '../../redux/slices/recipe';




export const RecipeSearch = ({setIsOpenSearch, isOpenSearch, dataId}) => {
    const dispatch = useDispatch();
    // console.log(window.location.href.includes('my-profile'))

    // const numberOfRecipes = useSelector(state => state.recipes.recipes.items.length);
    // // const status = useSelector(state => state.recipes.recipes.status );
    // const [statusRecipes, setStatusRecipes] = useState(useSelector(state => state.recipes.recipes.status));


    const [value, setValue] = useState("");
    const onInput = (e) => setValue(e.target.value);
    const onClear = () => {
        setValue("");
    };


    const getSearchWords = (  ) => {
        dispatch(fetchRecipesByName(value))
    }

    const cancellation = (  ) => {
        setIsOpenSearch(!isOpenSearch)
        if ( value !== '' ) {
            if (window.location.href.includes('my-profile')) {
                dispatch(fetchMyRecipes(dataId))
            } else {
                dispatch(fetchRecipes())
            }
            // dispatch(fetchRecipes())
        }
    }



    return (
        <div className='background_search'>
            <div className="container"> 
                <div className="search-row">
                    <img className="header_logo" src="https://cdn.icon-icons.com/icons2/677/PNG/512/fried-egg_icon-icons.com_60839.png"/>
                    <Input 
                        value={value}
                        onInput={onInput}

                        className="header_input" 
                        size="large" 
                        placeholder="Поиск по названию" 
                    />
                    
                    <div className="search-btns">
                        <Button 
                            type="text" size="large"
                            onClick={getSearchWords}
                        > 
                            <SearchOutlined /> 
                        </Button>
                        <Button 
                            onClick={cancellation}
                            type="text" size="large"
                        > 
                            <CloseOutlined /> 
                        </Button>
                    </div>
                </div>            
            </div>
        </div>
    );
}