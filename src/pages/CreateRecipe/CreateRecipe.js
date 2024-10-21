import React from 'react';
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { Button } from 'antd';
import { useState } from 'react';
// import { v1 } from 'uuid';
// import { NavLink } from 'react-router-dom';
import axios from '../../axios';

import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';

import RecipeIngredients from '../../components/CreateRecipe/RecipeIngredients';
import RecipeSteps from '../../components/CreateRecipe/RecipeSteps';
import RecipeTitul from '../../components/CreateRecipe/RecipeTitul';
import RecipeKeyWords from '../../components/CreateRecipe/RecipeKeyWords';
import RecipeHref from '../../components/CreateRecipe/RecipeHref';
import RecipeImg from '../../components/CreateRecipe/RecipeImg';

import './CreateRecipe.css';
import './Media-CreateRecipe.css';
import { RecipeImg2 } from '../../components/CreateRecipe/RecipeImg2';
import zaglyshka from '../../icons/zaglyshka10.png';



function CreateRecipe (props) {
  // console.log(zaglyshka)
  const {id} = useParams();

  const navigate = useNavigate();
  const inputRef = React.useRef(null)

  const isEditing = Boolean(id)

  const isAuth = useSelector(selectIsAuth);



  const [products, setIngredients] = useState([])
  const inputIngredient = (ingredients) => {
    setIngredients(ingredients)
  }


  let stepsArr = []
  const inputStep = (stepsArray) => {
    stepsArr = stepsArray;
    // stepsArray.map((it) => {console.log(it.photo)})
    // console.log(stepsArr)
  };


  let titul = ''
  const inputTitul = (inTitul) => {
    titul = inTitul;
  };

  let keyWorlds = '';
  const inputKeyWords = (inputKeyWorlds) => {
    keyWorlds = inputKeyWorlds;
  }

  let hrefRecipe = ''
  const inputHref = (inputHref) => {
    hrefRecipe = inputHref;
  }




  
  const [mainImg, setMainImg] = useState('');
  const [mainImgObj, setMainImgObj] = useState('');

  const getMainImgObj = async (ooo) => {

    setMainImgObj(ooo)
  }

  const inputImg = async (img, obj) => {
    // console.log('ГЛАВНОЕ ИЗОБРАЖЕНИЕ:::::', img);

    try {
      setMainImg(img)

      if (img !== '') {
        setImgError(true)
      }
      // const formData = new FormData();
      // formData.append('image', obj);
      // const {data} = await axios.post('/upload', formData)
        
    } catch (err) {
      console.warn(err)
      alert('Ошибка при загрузке файла2')
    }
    setImgError(false)
  }


  const [titulError, setTitulError] = useState(false);
  const [keyWorldsError, setKeyWorldsError] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [productsError, setProductsError] = useState(false);
  // console.log(productsError)

  let recipe = '';

  const getInputs = async () => {         
    // console.log(mainImg)

    try {
      if ( titul !== '' && (mainImg !== '' || mainImg !== null) && keyWorlds !== '' && products.join('').length !== 0) {
        if (stepsArr[0].step.length > 0) {
          stepsArr.forEach((it, i) => {
            if (it.photo == '') {
              stepsArr[i] = { 
                ...it,
                photo: zaglyshka, 
              }
            } 
          })
        }
        
        recipe = 
        {
          img: mainImg,
          description: titul,
          products: products,
          keyWords: keyWorlds,
          steps: stepsArr,
          href: hrefRecipe,
        }
        const { data } = isEditing 
        ? await axios.patch(`/recipes/${id}`, recipe)
        : await axios.post('/recipes', recipe)

        const _id = isEditing ? id : data._id ;

        navigate(`/recipes/${_id}`)
      } else {

        if (products.join('').length == 0 || products.join('').length <= 1) {
          setProductsError(true)
          // setTimeout(() => {
          //   setProductsError(false)
          // }, 3000);
        }
        if (titul.trim() === '') {
          setTitulError(true)
          
        }
        if (mainImg === '' || mainImg == null) {
          
          setImgError(true)
          // setTimeout(() => {
          //   setImgError(false)
          // }, 3000);
        } 
        if (keyWorlds === '' || keyWorlds === undefined) {
          setKeyWorldsError(true)
        }
      }
    } catch (err) {
      console.warn(err)
      console.log(err)
      alert(`Ошибка при создании рецепта! ${err.response.data.message

      // alert(`Ошибка при создании рецепта! ${err.response.data[0].message ? err.response.data[0].msg : err.response.statusText || err.response.data.message
      }`)
    }
  }



  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/"></Navigate>
  }

  return (
    <div className='create-recipe-block'>
      <div className='two-columns'>
        <div className='colomns-text'>
          <RecipeTitul 
            idEdit={isEditing ? id : undefined}
            getTitul={inputTitul} 
            titulError={titulError} 
            setTitulError={setTitulError}
          />
          <RecipeKeyWords 
            idEdit={isEditing ? id : undefined}
            getKeyWorlds={inputKeyWords} 
            keyWorldsError={keyWorldsError} 
            setKeyWorldsError={setKeyWorldsError}
          />
          <RecipeHref
            idEdit={isEditing ? id : undefined}
            getHref={inputHref}/>
        </div>

        {/* <RecipeImg 
          idEdit={isEditing ? id : undefined}
          getImg={inputImg} 
          imgError={imgError} 
          setImgError={setImgError}
        /> */}

        <RecipeImg2 
          idEdit={isEditing ? id : undefined}
          getImg={inputImg} 
          imgError={imgError} 
          setImgError={setImgError}
          getMainImgObj={getMainImgObj}
        />


      </div>

      <RecipeIngredients 
        idEdit={isEditing ? id : undefined}
        getIngredients={inputIngredient} 
        productsError={productsError} 
        setProductsError={setProductsError}
        // errorIngredient={productsError}
      />

      <RecipeSteps 
        idEdit={isEditing ? id : undefined}
        getSteps={inputStep}
      />

      <Button onClick={getInputs} className='btn-red-add' block danger>
        {isEditing ? 'СОХРАНИТЬ' : 'ДОБАВИТЬ РЕЦЕПТ'}
      </Button>

    </div>
  )
}
  
export default CreateRecipe;