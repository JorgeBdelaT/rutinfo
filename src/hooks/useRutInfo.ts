import { useEffect, useState, useRef, useCallback } from 'react';
import Axios from 'axios';

import { RutInfoType } from '../types';
import useNotifications from './useNotifications';
import {
  BASE_URL,
  DEFAULT_RUT_INFO_TYPE,
  REQUEST_ERROR_MSG,
  REQUEST_SUCCESS_MSG,
} from '../utils/constants';

const useRutInfo = (): [(rut: string) => void, RutInfoType] => {
  const isCurrent = useRef(true);
  const [state, setState] = useState<RutInfoType>(DEFAULT_RUT_INFO_TYPE);
  const [makeRequest, setMakeRequest] = useState(false);
  const [rut, setRut] = useState('');
  const { addNotification } = useNotifications();

  const prepareRequest = (rut: string) => {
    setMakeRequest(true);
    setRut(rut);
  };

  const getRutInfo = useCallback(async () => {
    if (makeRequest && isCurrent.current) {
      setState({ ...DEFAULT_RUT_INFO_TYPE, loading: true });

      try {
        const response = await Axios.get(BASE_URL, { params: { rut } });
        setState({ data: response.data, loading: false, error: undefined });
        addNotification({
          message: REQUEST_SUCCESS_MSG,
          type: 'success',
        });
      } catch (error) {
        setState((state) => {
          return { ...state, error, loading: false };
        });
        addNotification({
          message: REQUEST_ERROR_MSG,
          type: 'error',
        });
      }

      setMakeRequest(false);
    }
  }, [makeRequest, rut]);

  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    getRutInfo();
  }, [rut]);

  return [prepareRequest, state];
};

export default useRutInfo;
