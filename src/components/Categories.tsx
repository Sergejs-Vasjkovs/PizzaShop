import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentCategory } from '../store/slices/sort';
import categories from '../fakeAPI/categories.json';
// import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps = {
  value: string;
};

const Categories: React.FC<CategoriesProps> = ({ value }) => {
  // useWhyDidYouUpdate('Categories', { value });
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((category) => (
          <li
            className={value === category ? 'active' : ''}
            key={category}
            onClick={() => dispatch(setCurrentCategory(category))}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
