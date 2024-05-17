import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MyCart({cartItems, removeCartItem}) { 
  const [cartList, setCartList] = useState([]);  //cartItems + product.json

  useEffect(()=>{
    const url = "http://127.0.0.1:8080/carts";
    axios({
            method: 'post',
            url: url,
            data: {"items" : cartItems}
          })
          .then(res => setCartList(res.data))
          .catch(error => console.log(error));
  } , []);

    return (
      <div className='content'> 
        <h1>MyCart11</h1>
        <table border="1">
          <tr>
            <th>카트아이디</th>
            <th>상품아이디</th>
            <th>이미지</th>
            <th>상품명</th>
            <th>상품정보</th>
            <th>사이즈</th>
            <th>가격</th>
            <th>수량</th>
            <th>선택</th>
          </tr>
          {cartList.map(item => (
            <tr>
              <td>{item.cid}</td>
              <td>{item.id}</td>
              <td><img src={item.image} style={{width:"150px"}}/></td>
              <td>{item.name}</td>
              <td>{item.info}</td>
              <td>{item.size}</td>
              <td>{item.price}</td>
              <td>{item.qty}</td>
              <td>
                <button type="button" 
                    onClick={()=>removeCartItem(item.cid, item.qty)} >삭제</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
}