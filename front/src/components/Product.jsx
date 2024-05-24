import React, { useState, useEffect }  from 'react';
import ProductAvata from './ProductAvata';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Product() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8080/product/all')
      .then(res => setProductList(res.data))
      .catch(error => console.log(error));

  }, []);

  // console.log('productList--->>', productList);

  //출력리스트 갯수 설정
  const rows = [];  
  for(let i=0; i < productList.length; i+=3){ // [{0},{1},{2},{3}]  {4}
      rows.push(productList.slice(i, i+3));  // [{0},{1},{2},{3}]
  }

    return (
      <div>
        {rows.map((rowArray, index) => (
          <div key={index} className='product-list'>
            {rowArray.map(product => (
              <Link to={`/products/${product.id}`}>
                <ProductAvata image={product.image}/>
              </Link>
            ))}
          </div>
        ))}
      </div>
    );
}

