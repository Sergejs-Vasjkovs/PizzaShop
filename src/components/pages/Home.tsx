import React, { useEffect, useRef } from 'react';

import Sort from '../Sort';
import Categories from '../Categories';
import PizzaBlockSkeleton from '../PizzaBlock/PizzaBlockSkeleton';
import PizzaBlock from '../PizzaBlock/PizzaBlock';
import '../../scss/app.scss';

import Pagination from '../Pagination/Pagination';
import { useSelector } from 'react-redux';
import {
  SortSliceState,
  getSortCategorySelector,
  getSortCurrentPageSelector,
  getSortValueSelector,
  setFilters,
} from '../../store/slices/sort';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import {
  fetchPizzas,
  getPizzasItemsSelector,
  getPizzasStatusSelector,
} from '../../store/slices/pizzas';
import { useAppDispatch } from '../../store/store';

const Home: React.FC = () => {
  const searchValue = useSelector(getSortValueSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const activeSort = useSelector(getSortValueSelector);
  const category = useSelector(getSortCategorySelector);
  const currentPage = useSelector(getSortCurrentPageSelector);

  const pizzas = useSelector(getPizzasItemsSelector);
  const isLoading = useSelector(getPizzasStatusSelector);

  const getPizzas = async () => {
    const categoryQuery = category === 'All' ? '' : `&category=${category}`;
    const order = activeSort.includes('↑') ? 'asc' : 'desc';
    const ratingQuery = `&sortBy=${activeSort.slice(0, activeSort.length - 2)}&order=${order}`;
    const searchQuery = searchValue ? `&search=${searchValue}` : '';
    const limitQuery = `page=${currentPage}&limit=4`;

    dispatch(fetchPizzas({ categoryQuery, ratingQuery, searchQuery, limitQuery }));
  };

  useEffect(() => {
    getPizzas();
  }, [category, activeSort, searchValue, currentPage]);

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SortSliceState;
  //     dispatch(setFilters(params));
  //     isSearch.current = true;
  //   }
  // }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   if (!isSearch.current) {
  //     getPizzas();
  //   }
  //   isSearch.current = false;
  // }, [category, activeSort, searchValue, currentPage]);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       category: category,
  //       currentPage,
  //       searchValue,
  //       value: activeSort,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [category, activeSort, searchValue, currentPage]);

  if (isLoading === 'error') {
    return (
      <div className="cart cart--empty">
        <h2>Something went wrong 😕</h2>
        <p>Please try again in a few minutes!</p>
      </div>
    );
  }

  return (
    <>
      <div className="content__top">
        <Categories value={category} />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {isLoading === 'loading'
          ? [...new Array(6)].map((_, index) => <PizzaBlockSkeleton key={index} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
      <Pagination />
    </>
  );
};

export default Home;
