import Customer from '../models/customers.model';

export interface CustomerRepository {
  /**
   *
   */
  getAll(): Promise<Customer[]>;

  /**
   * Returns customer filtered by id
   * @param {number} customerId
   * @returns a `Customer` object containing the data.
   */
  getProduct(id: number): Promise<Customer>;

  /**
   *
   */
  createCustomer(customer: Customer): Promise<Customer>;

  /**
   *
   */
  deleteCustomer(customerId: number): Promise<Customer>;

  /**
   *
   */
  updateItem(customerId: string, customer: Customer): Promise<Customer>;
}
