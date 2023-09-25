import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem, addItem, getCartItemsSelector } from '../../store/slices/cart';
import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
import PizzaSelector from '../UI/PizzaSelector/PizzaSelector';

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
  category: string;
  description: string;
};

export type IPizza = {
  selectedCount: number;
};

const PizzaBlock: React.FC<PizzaBlockProps> = (props) => {
  const dispatch = useDispatch();
  const { id, title, price, imageUrl, sizes, types, rating } = props;

  const [typeActive, setTypeActive] = useState<number>(types[0]);
  const [sizeActive, setSizeActive] = useState<number>(sizes[0]);
  const cart = useSelector(getCartItemsSelector);
  const pizzaCount = cart.filter((item) => item.id === id);
  const totalPizzaCount = pizzaCount.reduce((sum: number, pizza: IPizza) => {
    return pizza.selectedCount + sum;
  }, 0);

  const onClickAdd = () => {
    const item: CartItem = {
      ...props,
      selectedId: `${title}-${typeActive}-${sizeActive}`,
      selectedCount: 1,
      selected: {
        type: typeActive,
        size: sizeActive,
      },
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <h4 className="pizza-block__title">{title}</h4>
      <Link to={'pizza/' + id}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>
      <PizzaSelector types={types} sizes={sizes} setType={setTypeActive} setSize={setSizeActive} />
      <div className="pizza-block__starts">
        <span>{rating}/10 Rating</span>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">from {price} ¢</div>
        <Button onClick={onClickAdd} totalPizzaCount={totalPizzaCount} />
      </div>
    </div>
  );
};

export default PizzaBlock;
