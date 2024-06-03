import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DetailProduct({ addCartCount }) {
  /** GET : url을 통해 넘어오는 파라미터는 useParams hook!!  */
  const { id } = useParams();  // 상품아이디
  const [product, setProduct] = useState({});
  // const [cartItem, setCartItem] = useState({});
  const [size, setSize] = useState("XS");

  useEffect(()=>{
    axios.get(`http://127.0.0.1:8080/product/${id}`)
      .then(res => setProduct(res.data))
  }, []);


  //장바구니 추가
  const handleAddCart = (id) => {
    // alert(id+size);
    const url = `http://localhost:8080/carts/add`;
    axios({
      method : 'post',
      url : url,
      data : { pid : id, size : size }
    })
        .then(result => {
          if(result.data.cnt === 1) alert('장바구니에 추가 되었습니다.');
          addCartCount(result.data.cnt);
        })
        .catch(error => console.log(error));

  };

  return (
    <div className="content">
      <div className="product-detail">
      <img src={`http://192.168.50.54:8080/${product.image}`} />
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
