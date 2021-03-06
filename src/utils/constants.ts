export const BASE_URL = 'https://siichile.herokuapp.com/consulta';
export const DEFAULT_RUT_INFO_TYPE = {
  data: undefined,
  data2: undefined,
  loading: false,
  error: undefined,
};
export const NOTIFICATION_TIME = 3;
export const INVALID_RUT_MSG = 'Rut inválido';
export const REQUEST_ERROR_MSG = 'No se ha podido cargar la información';
export const REQUEST_SUCCESS_MSG = 'Información cargada con éxito';
export const WELCOME_MSG =
  'Consulta un rut para obtener información de una persona o empresa.';
export const INVALID_FILE_MSG = 'Archivo inválido';
export const FILE_SUCCESSFULLY_UPLOADED = 'Archivo subido correctamente';
// ver si incluir actividades
export const RUT_TABLE_COLUMNS = [
  { name: 'Rut', selector: 'rut' },
  { name: 'Razón social', selector: 'razon_social' },
];
export const DOWNLOAD_FAILED = 'No se ha podido descargar el archivo';
