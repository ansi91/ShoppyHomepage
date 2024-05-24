import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function DetailProduct({addCartCount}) { /** GET : url을 통해 넘어오는 파라미터는 useParams hook!!  */
  const { id } = useParams();  
  const [product, setProduct] = useState({});  
  const [size, setSize] = useState('XS');  

  useEffect(()=>{
    axios.get(`http://127.0.0.1:8080/product/${id}`)
      .then(res => setProduct(res.data))
  }, []);

  /**
   * addCartItem : 장바구니 추가
   */
  const addCartItem = (id) => {
    alert("장바구니에 담겼습니다.");
    const cid = Math.floor(100 + Math.random() * 900);
    addCartCount({cid:cid, id:id, size:size, qty:1});
  }

  // console.log('size---> ', size);

  
    return (
      <div className='content'>
        <div className='product-detail'>
          <img src={`http://192.168.50.54:8080/${product.image}`} />
          <ul>
            <li className="product-detail-title">{product.name}</li>
            <li className="product-detail-title">{product.price}</li>
            <li className="product-detail-subtitle">{product.info}</li>
            <li>
              <span className='product-detail-select1'>옵션 : </span>
              <select className='product-detail-select2'
                      onChange={(e)=>setSize(e.target.value)}>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </li>
            <li>
              <button type="button" 
                      className='product-detail-button'
                      onClick={()=>addCartItem(product.id)}>장바구니 담기</button>
            </li>
          </ul>
        </div>
      </div>
    );
}