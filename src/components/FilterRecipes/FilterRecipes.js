import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './FilterRecipes.css';
import { Button } from 'antd';
import { Cascader } from 'antd';
import { fetchRecipes, fetchRecipesByWords, fetchMyRecipes, fetchMySaveRecipesByFilter, fetchSaveRecipes, fetchMyRecipesByFilter } from '../../redux/slices/recipe';
import { fetchAuthMe } from '../../redux/slices/auth';


const options = [
    //   {
    //     label: 'Light',
    //     value: 'light',
    //     children: new Array(20).fill(null).map((_, index) => ({
    //       label: `Number ${index}`,
    //       value: index,
    //     })),
    //   },
      {
        label: 'СУПЫ',
        value: 'СУПЫ',
        children: [
          {
            label: 'ГОВЯДИНА',
            value: 'ГОВЯДИНА',
            // children: [
            //   {
            //     label: 'Toy Fish',
            //     value: 'fish',
            //     disableCheckbox: true,
            //   },
            //   {
            //     label: 'Toy Cards',
            //     value: 'cards',
            //   },
            //   {
            //     label: 'Toy Bird',
            //     value: 'bird',
            //   },
            // ],
          },
          {
            label: 'СВИНИНА',
            value: 'СВИНИНА',
          },
          {
            label: 'КУРИЦА',
            value: 'КУРИЦА',
          },
          {
            label: 'ИНДЕЙКА',
            value: 'ИНДЕЙКА',
          },
          {
            label: 'РЫБА',
            value: 'РЫБА',
          },
          {
            label: 'ОВОЩИ',
            value: 'ОВОЩИ',
          },
        ],
        
      },
      {
        label: 'ОСНОВНЫЕ БЛЮДА',
        value: 'ОСНОВНЫЕ БЛЮДА',
        children: [
          {
            label: 'ГОВЯДИНА',
            value: 'ГОВЯДИНА',
          },
          {
            label: 'СВИНИНА',
            value: 'СВИНИНА',
          },
          {
            label: 'КУРИЦА',
            value: 'КУРИЦА',
          },
          {
            label: 'ИНДЕЙКА',
            value: 'ИНДЕЙКА',
          },
          {
            label: 'РЫБА',
            value: 'РЫБА',
          },
          {
            label: 'ОВОЩИ',
            value: 'ОВОЩИ',
          },
        ],
      },
      {
        label: 'ЗАВТРАКИ',
        value: 'ЗАВТРАКИ',
      },
      {
        label: 'ПЕРЕКУСЫ',
        value: 'ПЕРЕКУСЫ',
      },
      {
        label: 'ДЕСЕРТЫ И ВЫПЕЧКА',
        value: 'ДЕСЕРТЫ И ВЫПЕЧКА',
      },
      {
        label: 'НАПИТКИ',
        value: 'НАПИТКИ',
      },
    ];


export const FilterRecipes = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.auth.data);

  const [filterWorlds, setFilterWorlds] = useState('');

  const onChange = (value) => {
    setFilterWorlds(value)
  };


  const getWords = (  ) => {
    if (window.location.href.includes('my-saved-recipes')) {
      let idAndWords = [data._id, filterWorlds.join("&")]
      dispatch(fetchMySaveRecipesByFilter(idAndWords))
    } else if (window.location.href.includes('my-recipes')) {
      let idAndWords = [data._id, filterWorlds.join("&")]
      dispatch(fetchMyRecipesByFilter(idAndWords))
    } else {
      dispatch(fetchRecipesByWords(filterWorlds.join("&")))
    }
  }

  const showAll = () => {
    if (window.location.href.includes('my-saved-recipes')) {
      dispatch(fetchSaveRecipes(data._id))
    } else if (window.location.href.includes('my-recipes')) {
      dispatch(fetchMyRecipes(data._id))
    } else {
      dispatch(fetchRecipes())
    }
  }



  return (
      <div className='filter-row'>
        <div className='filter-btn-row'>
            <Button type="primary" ghost onClick={showAll} className='filter-return'> 
              Показать все 
            </Button>

            <Cascader
              className='filter-cascader'
              style={{width: '100%',}}
              options={options}
              onChange={onChange}
              maxTagCount="responsive"
            />

            <Button onClick={getWords} className='filter-search'>
              Найти 
            </Button>

        </div>

        <div className='filter_mini-btns'>
          <Button type="primary" ghost onClick={showAll} > 
              Показать все 
          </Button>

          <Button onClick={getWords} >
              Найти 
          </Button>

        </div>




      </div>
  );
}