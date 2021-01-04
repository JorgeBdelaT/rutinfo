import { useState } from 'react';
import * as XLSX from 'xlsx';
import { format as formatRut, validate as validateRut } from 'rut.js';

type UseLoadRutsType = {
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  file?: File;
  ruts?: string[];
};

const useLoadRuts = (): UseLoadRutsType => {
  const [file, setFile] = useState<File>();
  const [ruts, setRuts] = useState<string[]>();

  // process CSV data
  const processData = (dataString: string) => {
    const dataStringLines = Array.from(
      new Set(
        dataString
          .split(/\r\n|\n/)
          .filter((line) => line !== '' || validateRut(line))
          .map((line) => formatRut(line)),
      ),
    );
    setRuts(dataStringLines);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const uploadedFile = target.files![0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target!.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws);
      processData(data);
    };
    reader.readAsBinaryString(uploadedFile);

    setFile(uploadedFile);
  };

  return { handleFileUpload, file, ruts };
};

export default useLoadRuts;
