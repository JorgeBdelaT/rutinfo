export type RutInfoType = {
  data: RutData | undefined;
  loading: boolean;
  error: Error | undefined;
};

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
};
