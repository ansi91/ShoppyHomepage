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
import { useState } from 'react';


function App() {

    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    //cartItem 삭제
    const removeCartItem = (cid, qty) => {
      const removeIndex = cartItems.findIndex(item => item.cid === cid);
      const updateCartList = cartItems.filter((item, i) => i !== removeIndex );
      setCartItems(updateCartList);
      setCartCount(cartCount-qty);
    }

    // 장바구니 추가
    const addCartCount = (item) => {  
      console.log('item--> ', item);  //{id:1, size:XS, qty:1}

    //cartItems에 item 추가!! - 상품아이디와 사이즈가 동일한 경우에는 수량을 하나 증가시킴!
    //1. 상품아이디와 사이즈가 동일한 아이템이 있으면 해당 인덱스를 저장 - findIndex
    const updateItemIndex 
              = cartItems.findIndex(cartItem => cartItem.id === item.id 
                                              && cartItem.size === item.size );
  console.log('index--', updateItemIndex);                                              
    //2. 인덱스가 -1 이 아니면 ==> qty 증가
    //   -1 이면 새로 추가 
    if(updateItemIndex !== -1) { // 기존 item 존재
      const updateItems = [...cartItems];
      updateItems[updateItemIndex].qty++;
      setCartItems(updateItems);
    } else { // 새로운 item
      setCartItems([...cartItems, item]); 
    }

    setCartCount(cartCount + 1);
  }
  console.log('App :: cartItems--> ', cartItems);

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
        { path: "/board/:bid", element: <BoardContent /> },
        { path: "/board/update", element: <BoardUpdate /> },
        { path: "/board/delete", element: <BoardDelete /> },
        { path: "/board/new", element: <BoardWrite /> },
      ],
    },
  ]);


  return (
    <RouterProvider router={router} />
  );
}

export default App;
