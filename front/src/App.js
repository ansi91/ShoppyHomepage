import './css/style.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import NewProduct from './pages/NewProduct';
import MyCart from './pages/MyCart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DetailProduct from './pages/DetailProduct';
import Root from './pages/Root'
import BoardList from './pages/board/BoardList'
import BoardContent from './pages/board/BoardContent'
import BoardUpdate from './pages/board/BoardUpdate'
import BoardDelete from './pages/board/BoardDelete'
import BoardWrite from './pages/board/BoardWrite'

import { useEffect, useState } from 'react';
import axios  from 'axios';


function App() {

    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    //1. 로그인 여부 체크
    //2. 로그인 한 경우 => 회원 아이디로 cartCount 가져오기
    useEffect(() => {
      const url = `http://localhost:8080/carts/count`;
      axios({
        method : 'post',
        url : url,
        data : { userId : 'hong'} 
      })
          .then(result => setCartCount(parseInt(result.data.count)))
          .catch(error => console.log(error));
    }, []);

    //cartItem 삭제
    const removeCartItem = (cid, qty) => {
      const removeIndex = cartItems.findIndex(item => item.cid === cid);
      const updateCartList = cartItems.filter((item, i) => i !== removeIndex );
      setCartItems(updateCartList);
      setCartCount(cartCount-qty);
    }

    // DetailProduct에서 처리한 장바구니 추가 결과 가져오기
    const addCartCount = (result) => {  
      console.log('addCartCount ==> ', result);
      if(result === 1) setCartCount(cartCount + 1);
    }
  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root cartCount={cartCount}/>, /** layout 정의 */
      // loader: rootLoader,
      children: [
        { path: "/", element: <Home /> },
        { path: "/products", element: <AllProducts /> },
        { path: "/products/:id", element: <DetailProduct addCartCount={addCartCount}/> },
        { path: "/products/new", element: <NewProduct /> },
        { path: "/carts", element: <MyCart cartItems={cartItems} 
                                        removeCartItem={removeCartItem} /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/board", element: <BoardList /> },
        { path: "/board/:bid/:rno", element: <BoardContent /> },
        { path: "/board/update/:bid/:rno", element: <BoardUpdate /> },
        { path: "/board/delete/:bid/:rno", element: <BoardDelete /> },
        { path: "/board/new", element: <BoardWrite /> },
      ],
    },
  ]);


  return (
    <RouterProvider router={router} />
  );
}

export default App;
