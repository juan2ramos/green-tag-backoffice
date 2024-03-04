export interface Agency {
  id?: string;
  name: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
  compensationStrategies?: CompensationStrategiesEntity[] | null;
}
export interface CompensationStrategiesEntity {
  id?: string;
  name?: string;
  description?: null;
  additionalData: AdditionalData;
  createdAt?: string;
  updatedAt?: string;
}
export interface AdditionalData {
  username?: string;
  password?: string;
  email?: string;
  client_id?: string | null;
  client_secret?: string | null;
}
