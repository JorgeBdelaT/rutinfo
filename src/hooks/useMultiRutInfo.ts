import { useEffect, useState, useRef } from 'react';
import Axios from 'axios';

import { MultiRutInfoType } from '../types';
import useNotifications from './useNotifications';
import {
  BASE_URL,
  DEFAULT_RUT_INFO_TYPE,
  REQUEST_ERROR_MSG,
  REQUEST_SUCCESS_MSG,
} from '../utils/constants';

const useMultiRutInfo = (): [(ruts: string[]) => void, MultiRutInfoType] => {
  const isCurrent = useRef(true);
  const [state, setState] = useState<MultiRutInfoType>(DEFAULT_RUT_INFO_TYPE);
  const [makeRequest, setMakeRequest] = useState(false);
  const [ruts, setRuts] = useState<string[]>([]);
  const { addNotification } = useNotifications();

  const prepareRequest = (ruts: string[]) => {
    setMakeRequest(true);
    setRuts(ruts);
  };

  const getInfo = async () => {
    if (makeRequest && isCurrent.current) {
      setState({ ...DEFAULT_RUT_INFO_TYPE, loading: true });

      try {
        const requests = ruts.map((rut) => {
          return Axios.get(BASE_URL, { params: { rut } });
        });

        const response = await Axios.all(requests);

        setState({
          data: response.map((record) => record.data),
          loading: false,
          error: undefined,
        });
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
  };

  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    getInfo();
  }, [ruts]);

  return [prepareRequest, state];
};

export default useMultiRutInfo;
