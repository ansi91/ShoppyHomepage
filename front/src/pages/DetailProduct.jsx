import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { productDetail } from '../modules/reduxProductsAxios';
import { cartItemAdd } from '../modules/reduxCartsAxios';
import { getUser } from '../util/localStorage';

export default function DetailProduct({ addCartCount }) {
  const userId = getUser().userId;
  const dispatch = useDispatch();
  const { id } = useParams();  
  const product = useSelector(state => state.products.item);
  const [size, setSize] = useState("XS");

  useEffect(()=>{
    dispatch(productDetail({id}));
  }, []);

  const handleAddCart = (id) => {
    dispatch(cartItemAdd({id, size, userId}));
  };

  return (
    <div className="content">
      <div className="product-detail">
      <img src={`http://127.0.0.1:8080/${product.image}`} />
        <ul>
          <li className="product-detail-title">{product.name}</li>
          <li className="product-detail-title">{product.price}</li>
          <li className="product-detail-subtitle">{product.info}</li>
          <li>
            <span className="product-detail-select1">옵션 : </span>
            <select
              name="size"
              className="product-detail-select2"
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </li>
          <li>
            <button
              type="button"
              className="product-detail-button"
              onClick={() => handleAddCart(product.id)}
            >
              장바구니 추가
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
