export default class OrderIdInvalidException extends Error {
  constructor(message: string) {
    super(message);
  }
}
