import ItemPriceLessThanZeroException from '../exceptions/item-price-less-than-zero.exception';

export default class ItemModel {
  private id?: string;
  private readonly name: string;
  private readonly description: string;
  private readonly imageUrl?: string;
  private readonly price: number;
  private createdAt: Date;

  constructor(
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    price: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price || 0;
    this.validatePrice();
  }

  public validatePrice(): void {
    if (this.price <= 0) {
      throw new ItemPriceLessThanZeroException(
        'The item price should be greater than zero',
      );
    }
  }

  public getName(): string {
    return this.name;
  }

  public getId(): string {
    return this.id;
  }

  public getPrice(): number {
    return this.price;
  }

  public setCreatedAt(createdAt: Date): this {
    this.createdAt = createdAt;
    return this;
  }
}
