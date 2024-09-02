import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUser, removeUser } from '../util/localStorage';
import { useSelector, useDispatch } from 'react-redux';
import { cartListAxios } from '../modules/reduxCartsAxios';

export default function MyCart({cartItems, removeCartItem}) { 
  const dispatch = useDispatch();
  const userId = getUser().userId;
  const cartList = useSelector(state => state.carts.list);
  
  useEffect(()=>{
    dispatch(cartListAxios({userId}));
  } , []);

    return (
      <div className='content'> 
        <h1>MyCart</h1>
        <table border="1">
          <tr>
            <th>번호</th>
            <th>이미지</th>
            <th>상품명</th>
            <th>상품정보</th>
            <th>사이즈</th>
            <th>가격</th>
            <th>수량</th>
            <th>선택</th>
          </tr>
          {cartList && cartList.map(item => (
            <tr>
              <td>{item.rno}</td>              
              <td><img src={`http://localhost:8080/${item.image}`} style={{width:"150px"}}/></td>
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