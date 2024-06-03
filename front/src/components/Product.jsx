import React, { useState, useEffect }  from 'react';
import ProductAvata from './ProductAvata';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Product() {
  const [productList, setProductList] = useState([]); // [{},{},{}]
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    let startIndex = 0;
    let endIndex = 0;
    startIndex = (currentPage-1) * pageSize + 1;
    endIndex = currentPage * pageSize;

    const url = 'http://127.0.0.1:8080/product/all';
    axios({
      method : 'post',
      url : url,
      data : {
                'startIndex' : startIndex,
                'endIndex' : endIndex
            }      
    })
      .then(res => {
        setProductList([...productList, res.data]);
      })
      .catch(error => console.log(error));
  }, [currentPage]);

  // console.log('productList--->>', productList);

  //출력리스트 갯수 설정
  // const rows = [];  
  // for(let i=0; i < productList.length; i+=3){ // [{0},{1},{2},{3}]  {4}
  //     rows.push(productList.slice(i, i+3));  // [{0},{1},{2},{3}]
  // }

    return (
      <div>
        {productList.map((rowArray, index) => (
          <div key={index} className='product-list'>
            {rowArray.map(product => (
              <Link to={`/products/${product.id}`}>
                <ProductAvata image={product.image}/>
              </Link>
            ))}
          </div>
        ))}
        <button type="button"
                onClick={()=>setCurrentPage(currentPage+1)}>+더보기</button>
      </div>
    );
}

