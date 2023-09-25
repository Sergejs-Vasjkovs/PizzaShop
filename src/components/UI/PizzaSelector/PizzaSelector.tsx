import React, { useState } from 'react';

type PizzaSelectorProps = {
  types: number[];
  sizes: number[];
  setSize: any;
  setType: any;
};

const PizzaSelector: React.FC<PizzaSelectorProps> = ({ types, sizes, setSize, setType }) => {
  const typeNames = ['Thin', 'Traditional'];

  const [typeActive, setTypeActive] = useState(types[0]);
  const [sizeActive, setSizeActive] = useState(sizes[0]);

  const setSizeHandler = (size: number) => {
    setSizeActive(size);
    setSize(size);
  };

  const setTypeHandler = (type: number) => {
    setTypeActive(type);
    setType(type);
  };

  return (
    <div className="pizza-block__selector">
      <ul>
        {types.map((type) => (
          <li
            className={typeActive === type ? 'active' : ''}
            onClick={() => setTypeHandler(type)}
            data-type={type}
            key={type}>
            {typeNames[type]}
          </li>
        ))}
      </ul>
      <ul>
        {sizes.map((size) => (
          <li
            className={sizeActive === size ? 'active' : ''}
            onClick={() => setSizeHandler(size)}
            data-size={size}
            key={size}>
            {size} cm.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PizzaSelector;
