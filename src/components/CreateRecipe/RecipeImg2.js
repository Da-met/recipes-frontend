import React, { useState, useRef } from "react";
import axios from '../../axios';


import './RecipeImg.css';
// import './../../../../Back_repires/uploads/111.jpg'


// const getBase64 = (img, callback) => {
//     // console.log(img)
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
//   };


const beforeUpload = (file) => {
    console.log('мы сюда попали????:?')
    console.log(file)
    // console.log(typeof file)


    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {
    //   message.error('You can only upload JPG/PNG file!');
    // }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        alert('Image must smaller than 2MB!');
    }
    return isLt2M;
};




export const RecipeImg2 = (props) => {
    const getBase64 = (img, callback) => {
        // console.log(img)
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
        props.getMainImgObj(img)
    };


    const filePicker = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploaded, setUploaded] = useState();




    React.useEffect(() => {
        if (props.idEdit) {
            axios.get(`/recipes/${props.idEdit}`).then(({data}) => {
                setUploaded(data.img) 
            }).catch(err => {
                console.log(err)
            })
        }
    }, [])

    if( props.idEdit !== undefined ) { 
        props.getImg(uploaded);
    }


    const handleChange = async (event) => {
        setSelectedFile(event.target.files[0])
        // console.log(typeof event.target.files)
        // console.log(event.target.files)

        beforeUpload(event.target.files[0])
        getBase64(event.target.files[0], (url) => {
            // console.log(info.file.originFileObj)
            // const obj = info.file.originFileObj
            // setLoading(false);
            // setImageUrl(url);
            setUploaded(url)
            props.getImg(url, selectedFile);
          });
    };

    
    // const handleUpload = async () => {

    //     if(!selectedFile) {
    //         alert('ОТПРАВКA НА СЕРВЕР');
    //         return;
    //     };
    //     const formData = new FormData();
    //     formData.append('image', selectedFile);

    //     const {data} = await axios.post('/upload', formData)

    // }


    const handlePick = () => {
        filePicker.current.click();
    }

    // console.log(selectedFile);

    return (
        <div className="form-for-input">


            {/* <input type="file"></input> */}



            <button 
                type="button"
                // className="form-for-img" 
                onClick={handlePick}
                className={`form-for-img ${props.imgError ? "error-img" : ""}`}
            >
                {uploaded ? (
                <div className="main-img_uploaded">
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
            

            {/* <button onClick={handleUpload}> КНОПКА ОТПРАВКИ НА СЕРВЕР</button> */}



            {/* {uploaded && (
                <div className="">
                    <h2>{uploaded.url}</h2>
                    <img className="imgtttt" alt="" src={uploaded} />
                </div>
            )} */}
        </div>
    )

}

// export default RecipeImg2;