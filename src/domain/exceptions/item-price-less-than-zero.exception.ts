export default class ItemPriceLessThanZeroException extends Error {
  constructor(message: string) {
    super(message);
  }
}
