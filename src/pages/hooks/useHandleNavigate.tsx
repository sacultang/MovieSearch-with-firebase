import { useNavigate } from 'react-router-dom';
import { HandleClickNaviType } from '../../types/handleClickNaviType';
const useHandleNavigate = () => {
  const navigate = useNavigate();
  const handleClickNavigate: HandleClickNaviType = (id, type) => {
    navigate(`/details/${type}/${id}`, { state: { type, id } });
  };
  return handleClickNavigate;
};

export default useHandleNavigate;
