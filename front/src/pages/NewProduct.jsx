import React, { useState, useRef } from 'react';
import axios from 'axios';

export default function NewProduct() {
  const refs = {
    idRef: useRef(null),
    nameRef: useRef(null),
    priceRef: useRef(null)
  }

  const [productData, setProductData] = useState({
    id:'',
    name: '',
    price: 0,
    info: '',
    image: ''
  });

  /** 데이터 입력 */
  const handleChange = (e) => {
    const {name, value} = e.target;
    setProductData({
      ...productData,
      [name]:value
    });
  }

  /** 데이터 서버 전송 */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(validateCheck()) {
      // console.log('submit==>>', productData);
      //서버연동
      const url = "http://127.0.0.1:8080/product/new";
      axios({
        method: "post",
        url: url,
        data: productData
      })
        .then(res => {
          // const result = res.data;  // {cnt: 1}
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

    const id = refs.idRef.current;
    const name = refs.nameRef.current;
    const price = refs.priceRef.current;

    if(id.value === "") {
      alert("상품아이디를 입력해주세요");
      id.focus();
      checkFlag = false;
    } else if(name.value === "") {
      alert("상품명을 입력해주세요");
      name.focus();
      checkFlag = false;
    } else if(price.value === '0') {
      alert("상품가격을 입력해주세요");
      price.focus();
      checkFlag = false;
    }

    return checkFlag;
  }

    return (
      <div className='content'>
        <h2>New Product</h2>
        <ul>
          <li>
            <label>*상품아이디</label>
            <input type="text" 
                    name="id"
                    value={productData.id}
                    onChange={handleChange} 
                    ref={refs.idRef}/>
          </li>
          <li>
            <label>*상품명</label>
            <input type="text" 
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    ref={refs.nameRef}/>
          </li>
          <li>
            <label>*상품가격</label>
            <input type="text" 
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    ref={refs.priceRef}/>
          </li>
          <li>
            <label>상품정보</label>
            <input type="text" 
                    name="info"
                    value={productData.info}
                    onChange={handleChange}/>
          </li>
          <li>
            <label>상품이미지</label>
            <input type="file" 
                    name="image"
                    value={productData.image}
                    onChange={handleChange}/>
          </li>
          <li>
            <button type="button" onClick={handleSubmit}>등록완료</button>
            <button type="button">다시쓰기</button>
          </li>
        </ul>
      </div>
    );
}