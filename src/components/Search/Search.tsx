import React, { useCallback, useRef, useState } from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { getSortSearchValueSelector, setSearchValue } from '../../store/slices/sort';

const Search = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchValue = useSelector(getSortSearchValueSelector);
  const [inputValue, setInputValue] = useState('');

  const clearInputHandler = () => {
    dispatch(setSearchValue(''));
    setInputValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((value: string) => {
      dispatch(setSearchValue(value));
    }, 500),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 50 50"
        height="50px"
        id="Icons"
        version="1.1"
        viewBox="0 0 70 70"
        width="70px">
        <path d="M51.957,49.129l-8.713-8.713c1.75-2.337,2.799-5.229,2.799-8.373c0-7.732-6.268-14-14-14s-14,6.268-14,14s6.268,14,14,14  c3.144,0,6.036-1.049,8.373-2.799l8.713,8.713L51.957,49.129z M22.043,32.043c0-5.514,4.486-10,10-10c5.514,0,10,4.486,10,10  c0,5.514-4.486,10-10,10C26.529,42.043,22.043,37.557,22.043,32.043z" />
      </svg>
      <input
        ref={inputRef}
        className={styles.root}
        placeholder="Pizza search"
        value={inputValue}
        onChange={onChangeInput}
      />
      {searchValue && (
        <svg
          className={styles.close}
          onClick={clearInputHandler}
          height="32"
          viewBox="0 0 48 48"
          width="32"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  );
};

export default Search;
