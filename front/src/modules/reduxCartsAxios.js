import { setCartItem, setCartList } from '../reducers/cartsReducer';
import { axiosGet, axiosPost } from './reduxAxios';

/** cart list */
export function cartListAxios({userId}){
  const url = "http://127.0.0.1:8080/carts";
  const data = {"userId" : userId}

  return async(dispatch) => {
    const clist = await axiosPost({url, data});
    dispatch(setCartList({clist})); 
  }
}


/** cart item add */
export function cartItemAdd({id, size, userId}){
  const url = `http://localhost:8080/carts/add`;
  const data = { 
    pid : id, 
    size : size,
    userId : userId
  };

  return async(dispatch) => {
    const cnt = await axiosPost({url, data});
    dispatch(setCartItem(cnt));  
  }
}