export interface CustomerModel {
  id: number;
  email?: string;
  name?: string;
  cpf?: string;
  orders?: number[];
  createdAt: Date;
  updatedAt: Date;
}
