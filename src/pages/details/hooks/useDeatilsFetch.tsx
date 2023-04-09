import { useCallback, useEffect, useState } from 'react';
import { TrailerResult } from '../../../types/trailerType';
import { METHOD_CONS } from '../../../constants/fetchMethod';
import { requestData } from '../../../api/TMDB/request';
import { CreditType } from '../../../types/creditType';
import axios from 'axios';
import { MediaDetailsType } from '../../../types/mediaType';
import { useNavigate } from 'react-router-dom';
import { SimilarType } from '../../../types/similarType';
const useDeatilsFetch = (urlPath: string) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [similarData, setSimilarData] = useState<SimilarType[]>([]);
  const [trailers, setTrailers] = useState<TrailerResult[]>([]);
  const [credits, setCredits] = useState<CreditType[]>([]);
  const [details, setDetails] = useState<MediaDetailsType>();
  const [, MEDIA_TYPE] = urlPath.split('/');
  const fetchData = useCallback(
    async (urlPath: string) => {
      try {
        setLoading(true);
        const [detailRes, similarRes, creditsRes, trailerRes] = await axios.all(
          [
            requestData(`${urlPath}`, METHOD_CONS.get),
            requestData(`${urlPath}/similar`, METHOD_CONS.get),
            requestData(`${urlPath}/credits`, METHOD_CONS.get),
            requestData(`${urlPath}/videos`, METHOD_CONS.get),
          ]
        );
        if (!detailRes.data) {
          navigate('/error');
        }
        setDetails(detailRes.data);
        const newSimilarRes = similarRes.data.results.map(
          (item: SimilarType) => {
            return { ...item, media_type: MEDIA_TYPE };
          }
        );
        setSimilarData(newSimilarRes);
        setCredits(creditsRes.data.cast);
        setTrailers(trailerRes.data.results);
      } catch (e) {
        throw new Error(`${e}`);
      } finally {
        setLoading(false);
      }
    },
    [navigate, MEDIA_TYPE]
  );

  useEffect(() => {
    fetchData(urlPath);
  }, [fetchData, urlPath]);

  return { similarData, trailers, credits, details, loading };
};

export default useDeatilsFetch;
