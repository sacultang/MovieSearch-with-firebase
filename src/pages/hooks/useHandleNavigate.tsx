import { useNavigate } from 'react-router-dom';
import { HandleClickNaviType } from '../../types/handleClickNaviType';
const useHandleNavigate = () => {
  const navigate = useNavigate();
  const handleClick: HandleClickNaviType = (id, type) => {
    navigate(`/details/${type}/${id}`, { state: { type, id } });
  };
  return handleClick;
};

export default useHandleNavigate;
