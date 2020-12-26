export type RutInfoType = {
  data: RutData | undefined;
  loading: boolean;
  error: Error | undefined;
};

export type MultiRutInfoType = {
  data?: RutData[];
  loading: boolean;
  error?: Error;
};

export type ActivityKeysType = 'giro' | 'codigo' | 'categoria' | 'afecta';

export type ActivityType = {
  giro: string;
  codigo: number;
  categoria: string;
  afecta: boolean;
};

export type RutData = {
  rut: string;
  razon_social: string;
  actividades: ActivityType[];
  error?: string;
};
