import { useEffect, useState, useRef } from 'react';
import Axios from 'axios';

import { RutInfoType } from '../types';
import { BASE_URL, DEFAULT_RUT_INFO_TYPE } from '../utils/constants';

const useRutInfo = (rut: string): [() => void, RutInfoType] => {
  const isCurrent = useRef(true);
  const [state, setState] = useState<RutInfoType>(DEFAULT_RUT_INFO_TYPE);
  const [makeRequest, setMakeRequest] = useState(false);

  Axios.interceptors.response.use(
    (response) => {
      setState({ data: response.data, loading: false, error: undefined });

      return response;
    },
    (error) => {
      setState((state) => {
        return { ...state, error, loading: false };
      });

      return Promise.reject(error);
    },
  );

  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    if (makeRequest && isCurrent.current) {
      setState({ ...DEFAULT_RUT_INFO_TYPE, loading: true });

      Axios.get(BASE_URL, { params: { rut } });

      setMakeRequest(false);
    }
  }, [rut, setState, makeRequest, isCurrent]);

  return [() => setMakeRequest(true), state];
};

export default useRutInfo;
