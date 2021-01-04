import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

import { TableKeysType } from '../types/RutInfoType';

type DataType = {
  [key in TableKeysType]: string;
};

type UseDownloadRutsReturnType = [
  React.Dispatch<React.SetStateAction<boolean>>,
  {
    loading: boolean;
    error?: Error;
  },
];

const useDownloadRuts = (data?: DataType[]): UseDownloadRutsReturnType => {
  const [triggerDownload, setTriggerDownload] = useState(false);
  const [state, setState] = useState<{ loading: boolean; error?: Error }>({
    loading: false,
    error: undefined,
  });

  useEffect(() => {
    if (data && triggerDownload) {
      createExcelFile();
    }
  }, [triggerDownload, data]);

  const createExcelFile = () => {
    setState({ error: undefined, loading: true });
    try {
      const fileName = 'rut-info.xlsx';

      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data!);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Información de ruts');

      XLSX.writeFile(wb, fileName);

      setState({ error: undefined, loading: false });
    } catch (error) {
      setState({ error, loading: false });
    } finally {
      setTriggerDownload(false);
    }
  };

  return [() => setTriggerDownload(true), state];
};

export default useDownloadRuts;
