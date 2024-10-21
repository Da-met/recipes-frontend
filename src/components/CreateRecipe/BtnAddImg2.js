import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

import React, { useState, useRef } from "react";
import axios from '../../axios';

import './BtnAddImg.css';

const getBase64 = (img, callback) => {
  // console.log(img)
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
  // props.getMainImgObj(img)
};



const BtnAddImg2 = (props) => {
  const filePicker = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  // console.log(selectedFile)
  const [uploaded, setUploaded] = useState();


  React.useEffect(() => {
      if (props.idEdit !== undefined) {
          axios.get(`/recipes/${props.idEdit}`).then(({data}) => {
            setUploaded(data.img) 
          }).catch(err => {
              console.log(err)
          })
      }
  }, [])

  const handleChange = (event) => {
    getBase64(event.target.files[0], (url) => {
      setUploaded(url)    
      props.onGetImg(url, props.ind);
      setSelectedFile(url);
      // props.onGetImg(url, props.ind)
      // onGetImgUrl(url);
      // props.getImg(url, selectedFile);
    });
  };


  const handlePick = () => {
      filePicker.current.click();
  }



  return (
    <div className="form-for-input-btnAddImg">
      <button 
        type="button"
        className="form-for-btnAddImg" 
        onClick={handlePick}
        // className={`form-for-btnAddImg ${props.imgError ? "error-img" : ""}`}
      >
          {uploaded ? (
          <div className="main-btnAddImg_uploaded">
              <img className="" 
                alt="" 
                // src={uploaded} 
                src={props.newUrl}
              />
          </div>
          ) : (<p> + <br/> Загрузить фото </p>) }
      </button>

      <input 
          className="hidden"
          ref={filePicker}
          type="file" 
          onChange={handleChange} 
          accept="image/*, .png,.pdf,.jpg,.web"> 
      </input>
    </div>  
  );
};

export default BtnAddImg2;



