/* eslint-disable no-console */
import React, { useState } from 'react';
import { validate as validateRut, format as formatRut } from 'rut.js';
// import styled from 'styled-components';

import { useRutInfo } from '../../hooks';

const SingleRutInput: React.FC = () => {
  const [rut, setRut] = useState('');
  const [requestRutInfo, { data, loading, error }] = useRutInfo(rut);

  const handleClick = async () => {
    if (!validateRut(rut)) {
      console.log('invalid rut');
      setRut('');
      return;
    }

    requestRutInfo();
  };

  if (loading) console.log('cargando');
  if (error) console.log('error', error);
  if (data) console.log(data);

  return (
    <div>
      <input
        value={rut}
        onChange={(e) => setRut(formatRut(e.target.value))}
        placeholder="Ingresa un rut"
      />
      <button onClick={handleClick}>Enviar</button>
    </div>
  );
};

export default SingleRutInput;
