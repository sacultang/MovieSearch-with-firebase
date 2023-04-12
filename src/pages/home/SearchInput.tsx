import { FormEvent, useCallback } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
interface SearchInputProps {
  query?: string | undefined;
  border: string;
  handleDrawerClose?: () => void;
}

const SearchInput = ({
  query,
  border,
  handleDrawerClose,
}: SearchInputProps) => {
  const navigate = useNavigate();
  const goSearchResultPage = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const search = data.get('search');
      handleDrawerClose && handleDrawerClose();
      if (search === '' || search === null || search === undefined) return;

      navigate(`/search/${search}`);
    },
    [navigate, handleDrawerClose]
  );
  return (
    <InputWrap onSubmit={goSearchResultPage} border={border}>
      <InputField
        type="text"
        placeholder={query ? query : '영화,TV 프로그램 검색..'}
        name="search"
      />
      {border === 'drawer' ? null : (
        <ButtonWrap>
          <SearchButton>검색</SearchButton>
        </ButtonWrap>
      )}
    </InputWrap>
  );
};

export default SearchInput;

const InputWrap = styled.form<{ border: string }>`
  display: flex;
  border-radius: ${(props) => (props.border === 'drawer' ? 0 : '20px')};
  overflow: hidden;
  width: 100%;
  border: ${(props) => (props.border ? '1px solid #c9c9c9' : 'none')};
  background-color: #fff;
  box-sizing: border-box;
`;
const InputField = styled.input`
  border-radius: 20px;
  flex: 1;
  height: 40px;
  border: none;
  margin-left: 10px;
  overflow: hidden;
  &:focus {
    outline-width: 0;
  }
`;
const ButtonWrap = styled.div`
  border: 0.1px solid #c9c9c9;
  border-radius: 0 19px 19px 0;
  overflow: hidden;
  min-width: 50px;
  max-width: 100px;
`;
const SearchButton = styled.button`
  height: 100%;
  min-width: 50px;
  max-width: 100px;
  background: var(--main-bg-color);
  border: none;
  outline: none;
  border-radius: 0 19px 19px 0;
  color: #fff;
`;
