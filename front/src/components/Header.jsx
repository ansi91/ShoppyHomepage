import React from 'react';
import {FiShoppingBag} from 'react-icons/fi';
import {BsFillPencilFill} from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, removeUser } from '../util/localStorage';

export default function Header({cartCount}) {
  
  const navigate = useNavigate();
  const userInfo = getUser();
  const handleLogout = () => {
    removeUser();
    navigate("/");
  }

    return (
      <div className='header-outer'>
        <div className='header'>
          <Link to="/" className='header-left'>
            <FiShoppingBag />
            <span>Shoppy</span>
          </Link>
          <nav className='header-right'>            
            { userInfo ? 
               (
                <>
                  {userInfo.userId} 님! 반갑습니다.
                  <button type="button" onClick={handleLogout}>Logout</button>
                  <Link to="/products">Products</Link>
                  <Link to="/carts">MyCart ({cartCount})</Link>
                  <Link to="/board">
                    <button type="button">Board</button>
                  </Link>                  
                  <Link to="/products/new">
                    <BsFillPencilFill className="header-right-icon" />
                  </Link>
                </>
               ) : (
                <>
                  <Link to="/login">
                    <button type="button">Login</button>
                  </Link>
                  <Link to="/signup">
                    <button type="button">Signup</button>
                  </Link>
                  <Link to="/notice">
                      <button type="button">Notice</button>
                    </Link>
               </> 
               ) 
            }
          </nav>
        </div>
      </div>
    );
}