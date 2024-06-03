import React, { useState, useRef } from 'react';
import axios from 'axios';
import ImageUpload from '../components/ImageUpload';


export default function NewProduct() {

  const refs = {
    nameRef: useRef(null),
    priceRef: useRef(null)
  }
  const [image, setImage] = useState({});

  /** 파일업로드 파라미터 함수 : getImage */
  const getImage = (e) => {
    setImage(e);
  }
 
  /** 데이터 서버 전송 */
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    
    if(validateCheck()) {
      const url = "http://127.0.0.1:8080/product/new";
      axios({
        method: "post",
        url: url,
        data: formDataObject
      })
        .then(res => {
          if(res.data.cnt === 1) {
            alert("상품이 등록되었습니다.");
          } 
        })
        .catch(error => console.log(error));

    }
  }

  /** 유효성 체크 */
  const validateCheck = () => {
    let checkFlag = true;
    const name = refs.nameRef.current;
    const price = refs.priceRef.current;
 
    if(name.value === "") {
      alert("상품명을 입력해주세요");
      name.focus();
      checkFlag = false;
    } else if(price.value === "") {
      alert("상품가격을 입력해주세요");
      price.focus();
      checkFlag = false;
    }
    return checkFlag;
  }

    return (

      <div className='content'>
        <h2>New Product</h2>
        <form onSubmit={handleSubmit}>
        <ul>    
          <li>
            <label>*상품명</label>
            <input type="text" 
                    name="name"
                    ref={refs.nameRef}/>
          </li>
          <li>
            <label>*상품가격</label>
            <input type="text" 
                    name="price"
                    ref={refs.priceRef}/>
          </li>
          <li>
            <label>상품정보</label>
            <input type="text" 
                    name="info"
                    />
          </li>
          <li>
            <label>상품이미지</label>
            <ImageUpload getImage={getImage}/>
            <input type="hidden" 
                    name="uploadImage"
                    value={image.uploadImage}
                    />                               
            <input type="hidden" 
                    name="orgImage"
                    value={image.orgImage}
                    />                               
          </li>
          <li>
            <button type="submit">등록완료</button>
            <button type="button">다시쓰기</button>
          </li>
        </ul>
        </form> 
      </div>

    );
}