export interface Project {
  id?: string;
  name: string;
  url: string;
  file: string | object;
  createdAt?: string;
  updatedAt?: string;
  legacyBonuses?: legacyBonuses[] | null;
}
export interface legacyBonuses {
  id?: string;
  co2total: number;
  co2Compensated: number;
  url?: string;
  createdAt?: string;
  updatedAt?: string;
}
