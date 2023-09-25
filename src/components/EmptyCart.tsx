import React from 'react';
import emptyCartImg from '../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';

const EmptyCart: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>Cart is empty 😕</h2>
      <p>
        You probably haven't ordered pizza yet.
        <br />
        To order pizza, go to the main page.
      </p>
      <img src={emptyCartImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Back</span>
      </Link>
    </div>
  );
};

export default EmptyCart;
