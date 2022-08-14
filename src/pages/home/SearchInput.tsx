import React, { FormEvent, useCallback } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

interface IProps {
  query: string | undefined;
  border: string;
}
type borderProps = {
  border: string;
};
const SearchInput = ({ query, border }: IProps) => {
  const navigate = useNavigate();

  const getMovieList = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const search = data.get('search');
      if (search === '' || search === null || search === undefined) return;
      navigate(`/search/${search}`);
    },
    [navigate]
  );
  return (
    <InputWrap onSubmit={getMovieList} border={border}>
      <input
        type="text"
        placeholder={query ? query : '영화,TV 프로그램 검색..'}
        name="search"
      />
      {border === 'drawer' ? null : (
        <div>
          <button>검색</button>
        </div>
      )}
    </InputWrap>
  );
};

export default SearchInput;
const InputWrap = styled.form<borderProps>`
  display: flex;
  border-radius: ${(props) => (props.border === 'drawer' ? 0 : '20px')};
  overflow: hidden;
  width: 100%;
  border: ${(props) => (props.border ? '1px solid #c9c9c9' : 'none')};
  background-color: #fff;
  box-sizing: border-box;
  input {
    border-radius: 20px;
    flex: 1;
    height: 40px;
    border: none;
    margin-left: 10px;
    overflow: hidden;
    &:focus {
      outline-width: 0;
    }
  }
  div {
    border: 0.1px solid #c9c9c9;
    border-radius: 0 19px 19px 0;
    overflow: hidden;
    min-width: 50px;
    max-width: 100px;
  }
  button {
    height: 100%;
    min-width: 50px;
    max-width: 100px;
    background: var(--main-bg-color);
    border: none;
    outline: none;
    /* border: 5px solid var(--main-bg-color); */
    border-radius: 0 19px 19px 0;
    color: #fff;
  }
`;
