import React, { useState, useEffect }  from 'react';
import ProductAvata from './ProductAvata';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { productList as axiosProductList } from '../modules/reduxProductsAxios';


export default function Product() {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.products.list);  //[{1},{2},{3}~{6}]
  const page = useSelector(state => state.products.page);
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    dispatch(axiosProductList({currentPage}));
  }, [currentPage]);

  //출력리스트 갯수 설정
  const rows = [];  
  for(let i=0; i < productList.length; i+=3){ // [{0},{1},{2},{3}]  {4}
      rows.push(productList.slice(i, i+3));  // [{0},{1},{2},{3}]
  }

  console.log('productList=>', productList);
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
        <button type="button"
                onClick={()=>setCurrentPage(currentPage+1)}>+더보기</button>
      </div>
    );
}

