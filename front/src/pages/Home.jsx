import React from 'react';
import Product from '../components/Product';

export default function Home() {
    return (
      <div className='content'>
        <div className='banner'>          
          <h3>Shop With US</h3>
          <p>Best Products, High Quality</p>
        </div>
        <Product />
      </div>
    );
}