import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../UI/Loader/Loader';
import PizzaSelector from '../UI/PizzaSelector/PizzaSelector';
import Button from '../UI/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItemsSelector, addItem } from '../../store/slices/cart';
import { IPizza } from '../PizzaBlock/PizzaBlock';
import { CartItem } from '../../store/slices/types';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    id: string;
    price: number;
    category: string;
    imageUrl: string;
    title: string;
    description: string;
    rating: number;
    types: number[];
    sizes: number[];
  }>();

  const [typeActive, setTypeActive] = useState<number>(0);
  const [sizeActive, setSizeActive] = useState<number>(0);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPizzaById = async () => {
      try {
        const { data } = await axios.get('https://64b7971221b9aa6eb0788acf.mockapi.io/items/' + id);
        setPizza(data);
        console.log(data);
        setTypeActive(data.types[0]);
        setSizeActive(data.sizes[0]);
      } catch (error) {
        alert('Pizza not exist');
        navigate('/');
      }
    };
    fetchPizzaById();
  }, [id, navigate]);

  const cart = useSelector(getCartItemsSelector);
  const pizzaCount = cart.filter((item) => item.id === id);
  const totalPizzaCount = pizzaCount.reduce((sum: number, pizza: IPizza) => {
    return pizza.selectedCount + sum;
  }, 0);

  if (!pizza) return <Loader />;

  const onClickAdd = () => {
    const item: CartItem = {
      ...pizza,
      selectedId: `${pizza.title}-${typeActive}-${sizeActive}`,
      selectedCount: 1,
      selected: {
        type: typeActive,
        size: sizeActive,
      },
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block__main">
      <img className="pizza-block__image-full" src={pizza.imageUrl} alt="Pizza" />
      <div className="pizza-block__description">
        <h2>{pizza.title}</h2>
        <p>{pizza.description}</p>
        <p>
          Rating:
          <meter
            min="0"
            max="10"
            low={3}
            value={pizza.rating}
            title={`${pizza.rating} out of 10 stars`}
          />
          {pizza.rating} of 10 stars
        </p>
        <PizzaSelector
          types={pizza.types}
          sizes={pizza.sizes}
          setType={setTypeActive}
          setSize={setSizeActive}
        />
        <Button onClick={onClickAdd} totalPizzaCount={totalPizzaCount} />
      </div>
    </div>
  );
};

export default FullPizza;
