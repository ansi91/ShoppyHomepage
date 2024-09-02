import { setItem, setProductList } from '../reducers/productsReducer';
import { axiosGet, axiosPost } from './reduxAxios';

/** product detail */
export function productDetail({id}){
  const url = `http://127.0.0.1:8080/product/${id}`;  

  return async(dispatch) => {
    const item = await axiosGet({url}); 
    dispatch(setItem({item}))
  }
}

/** product list */
export function productList({currentPage}) {
    const pageSize = 3;
    let startIndex = 1;
    let endIndex = 0;
    // startIndex = (currentPage-1) * pageSize + 1;
    endIndex = currentPage * pageSize;
    
    const url = 'http://127.0.0.1:8080/product/all';
    const data = {
      'startIndex' : startIndex,
      'endIndex' : endIndex
    }  

    return async(dispatch) => {
      try{
        const plist =  await axiosPost({url, data});           
        dispatch(setProductList({plist, currentPage}));          
      }catch(error){}
      
  }//end of return
  
}