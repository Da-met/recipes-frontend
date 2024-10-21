import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useState } from 'react';

import './BtnAddImg.css';



const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Вы можете загрузить только файл JPG/PNG!');
  }
  // const isLt2M = file.size / 1024 / 1024 < 5;
  // if (!isLt2M) {
  //   message.error('Изображение должно быть меньше 5 МБ!');
  // }
  
  return isJpgOrPng;
  // && isLt2M;
};


const BtnAddImg = (props) => {

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  // console.log(imageUrl)
  // console.log(props)
  
  if (props.newUrl) {
    setImageUrl(props.newUrl)
  }
  
  const onGetImgUrl = (imageUrl) => {
    let index = props.ind;
    props.onGetImg(imageUrl, index)
  }

  const handleChange = async (info) => {
    console.log(info)
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'error') {
      // Получите этот URL-адрес из ответа в реальном мире.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        onGetImgUrl(url);

      });
      
    }
  };
  const uploadButton = (
    <div  className='btn-shell'>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div>
        Загрузить <br /> фото
      </div>
    </div>
  );
  

  return (
    <div className="btn-img-step_wrapper">
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader "

        showUploadList={false}
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        
      >
        {imageUrl || props.newUrl  ? (
          <img
            src={props.newUrl}
            alt="avatar"
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>  
  );
};
export default BtnAddImg;