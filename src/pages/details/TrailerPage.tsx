import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { getTrailer } from '../../api/TMDB/Search/getSearchAPI';
interface IProps {
  urlPath: string;
}
const TrailerPage = ({ urlPath }: IProps) => {
  const [trailers, setTrailers] = useState({});
  const fetch = async () => {
    const trailerRes = await getTrailer(urlPath);
    console.log(trailerRes);

    setTrailers(trailerRes);
  };
  useEffect(() => {
    fetch();
  }, []);
  return <div>TrailerPage</div>;
};

export default TrailerPage;
