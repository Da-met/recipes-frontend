import React, { useState, useRef } from "react";
import axios from '../../axios';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import './RegisterAvatar.css';
// import User from '../../../public/icons/User.png'


const beforeUpload = (file) => {
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //     alert('Image must smaller than 2MB!');
  // }
  // return isLt2M;
};



const RegisterAvatar2 = (props) => {
    const getBase64 = (img, callback) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
      // props.getMainImgObj(img)
    };


    const filePicker = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploaded, setUploaded] = useState();




    React.useEffect(() => {
      if (props.idEdit) {
          axios.get(`/auth/me`).then(({data}) => {
            setUploaded(data.avatarUrl) 
          }).catch(err => {
              console.log(err)
          })
      }
    }, [])


    if( props.idEdit !== undefined ) { 
        props.onGetImg(uploaded);
    }


    const handleChange = (event) => {
      setSelectedFile(event.target.files[0])
      beforeUpload(event.target.files[0])
      getBase64(event.target.files[0], (url) => {
          setUploaded(url 
            // || '../../public/icon'
          )

          // if (props.idEdit) {
            props.onGetImg(url);
          // }
        });
    };


    const handlePick = () => {
        filePicker.current.click();
    }



  return (
    <div className="form-for-input-imgEdit">
      <button 
          type="button"
          // className="form-for-img" 
          onClick={handlePick}
          className={`form-for-imgEdit ${props.imgError ? "error-img" : ""}`}
      >
          {uploaded ? (
          <div className="main-imgEdit_uploaded">
              <img alt="" 
                  // src={props.newUrl}
                  src={uploaded} 
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
export default RegisterAvatar2;