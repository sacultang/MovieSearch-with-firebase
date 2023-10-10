import { FormEvent, useCallback } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
interface SearchInputProps {
  isDrawer?: boolean;
  handleDrawerClose?: () => void;
}

const SearchInput = ({ isDrawer, handleDrawerClose }: SearchInputProps) => {
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
    <InputWrap onSubmit={goSearchResultPage} isDrawer={isDrawer}>
      <InputField
        type="text"
        placeholder="영화,TV 프로그램 검색.."
        name="search"
      />
      {isDrawer ? null : (
        <Button sx={{ backgroundColor: 'secondary.main' }}>검색</Button>
      )}
    </InputWrap>
  );
};

export default SearchInput;

const InputWrap = styled.form<{ isDrawer: boolean | undefined }>`
  display: flex;
  border-radius: ${(props) => (props.isDrawer ? 0 : '20px')};
  overflow: hidden;
  width: 100%;
  border: ${(props) => (props.isDrawer ? '1px solid #c9c9c9' : 'none')};
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
