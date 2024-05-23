export class CustomerModel {
  id: number;
  email?: string;
  name?: string;
  cpf?: string;
  orders?: number[];
  createdAt: Date;
  updatedAt: Date;
  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    email?: string,
    name?: string,
    cpf?: string,
    orders?: number[],
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.cpf = cpf;
    this.orders = orders;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
