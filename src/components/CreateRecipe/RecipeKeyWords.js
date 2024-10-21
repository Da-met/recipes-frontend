import React from 'react';
import axios from '../../axios';
import { Cascader } from 'antd';

import { useState } from 'react';
import './RecipeKeyWords.css';


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



const RecipeKeyWords = (props) => {
  
  const [keyWorlds, setKeyWorlds] = useState('');

  const onChange = (value) => {
    setKeyWorlds(value)
    // console.log(value)
    if (value !== '') {
      props.setKeyWorldsError(false)
    } 
  };

  React.useEffect(() => {
    if (props.idEdit) {
        axios.get(`/recipes/${props.idEdit}`).then(({data}) => {
          // console.log(data)
          setKeyWorlds(data.keyWords) 
        }).catch(err => {
            console.log(err)
        })
    }
  }, [])
  
  props.getKeyWorlds(keyWorlds)


    return (
        <div className='create-recipe-key_words'>
            <h3>Ключевые слова</h3>
            <Cascader
              value={keyWorlds}
              status={props.keyWorldsError ? "error" : "" }
              style={{width: '100%',}}
              options={options}
              onChange={onChange}
              maxTagCount="responsive"
            />

        </div>
    )

};


export default RecipeKeyWords;