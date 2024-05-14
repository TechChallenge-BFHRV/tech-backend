export default class CustomerIdInvalidException extends Error {
  constructor(message: string) {
    super(message);
  }
}
