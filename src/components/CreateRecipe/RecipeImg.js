import React, { useState } from 'react';
import axios from '../../axios';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

import './RecipeImg.css';


const getBase64 = (img, callback) => {
  // console.log(img)
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};


const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

// setImgError

const RecipeImg = (props) => {
  console.log(props)
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  // console.log(props)
  React.useEffect(() => {
      if (props.idEdit) {
          axios.get(`/recipes/${props.idEdit}`).then(({data}) => {
            setImageUrl(data.img) 
            // console.log(data.img)
          }).catch(err => {
              console.log(err)
          })
      }
  }, [])


  if( props.idEdit !== '' ) { 
    props.getImg(imageUrl);
  }

  console.log(imageUrl)

  const handleChange = (info) => {
    console.log('ЗАШЛИ', info.file.status);
    console.log(info);

    
    if (info.file.status === 'uploading') {
      console.log('ЗАШЛИ', info.file.status);
      setLoading(true);
      return;
    }
    if (info.file.status === 'error') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        const obj = info.file.originFileObj
        setLoading(false);
        setImageUrl(url);
        props.getImg(url, obj);
        console.log(info);
        // console.log(url, obj)
        // props.setImgError(false);
      });
    }
    
    
  };


  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Загрузить фото
      </div>
    </div>
  );




  return (
    <div className="recipe-img_wrapper">
      <Upload
        name="avatar"
        listType="picture-card"
        className={`avatar-uploader main-img ${props.imgError ? "error-img" : ""}`}
        // className={props.imgError ? "error-img avatar-uploader main-img" : "avatar-uploader main-img"}
              
        showUploadList={false}


        // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        // action="/upload" method="post"
        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"


        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" />
        ) : (
          uploadButton
        )}
      </Upload>

 

    </div>
  );
};
export default RecipeImg;




