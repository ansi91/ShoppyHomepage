import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  }

  return (
    <div>
      <img src='https://w3-lab.com/wp-content/uploads/2022/09/FOR-WEB-404-astronaut.jpg'/>
      <button type="button" onClick={handleClick}>홈으로</button>

    </div>

  );
}