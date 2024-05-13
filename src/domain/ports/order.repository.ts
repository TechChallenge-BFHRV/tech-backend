import Order from '../models/orders.model';

export interface OrderRepository {
  /**
   *
   */
  getAll(): Promise<Order[]>;

  /**
   * Returns order filtered by id
   * @param {number} orderId
   * @returns an `Order` object containing the data.
   */
  getOrder(id: number): Promise<Order>;

  /**
   *
   */
  createOrder(order: Order): Promise<Order>;

  /**
   *
   */
  deleteOrder(orderId: string): Promise<Order>;

  /**
   *
   */
  updateOrder(orderId: string, order: Order): Promise<Order>;
}
