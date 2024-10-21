import React from "react";
import { useState } from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './MiniCard.css';
import './Media-MiniCard.css';

import { EyeOutlined, MessageOutlined } from '@ant-design/icons';
import DataAndActiveBtn from "../DataAndActiveBtn/DataAndActiveBtn";
import { SkeletonMiniCardsList } from './SkeletonMiniCard';
import { fetchAuthMe } from "../../redux/slices/auth";

import zaglyshka from '../../icons/zaglyshka12.png';




function MiniCard (props) {
  const dispatch = useDispatch();

  if (props.isLoading) {
    return <SkeletonMiniCardsList/>;
  }

  return (
    
  <li>
    <div className="mini-card">
      <div className='mini-card_views-count'>
        <div>{props.countCommets}</div>
        <MessageOutlined />
        <div className="counter">
          <div>{props.viewsCount}</div>
          <EyeOutlined />
        </div>
        
      </div>
      <h2>{props.description}</h2>
      <img className='mini-card_logo' src={props.img}
        onError={(err) => {
          err.currentTarget.src=`${zaglyshka}`}}
      />

      <div className='mini-card_description'>
        
        <div className='mini-card_btn' >
          <div className='brief'>
            {props.keyWords.map((word) => (
              <div key={word}>{word}</div>
            ))}
          </div>

          <NavLink to={`/recipes/${props.id}`}>
            <Button>Перейти к рецепту</Button>
          </NavLink> 
        </div>
        <div className='mini-card_active-btn'> 
          <DataAndActiveBtn 
            user={props.user}
            time={props.time}
            isEditable={props.isEditable}
            id={props.id}
            isSave={props.isSave}
            // isSave={isSaveOrNot}
            // setIsSave={setIsSaveOrNot}
            
            editListOfSavedRecipes={props.editListOfSavedRecipes}
            deleteListOfSavedRecipes={props.deleteListOfSavedRecipes}

            // allSavedRecipes={props.allSavedRecipes}

            deleteRecipe={props.deleteRecipe}
            />
        </div>
      </div>
    </div>
    {/* <SkeletonMiniCardsList/> */}
  </li>
      
  );
}
  
export default MiniCard;