import { Domain } from '../types/domain';
class CustomException extends Error {
  public statusCode: Domain.ResponseStatuses;

  constructor(message: string, statusCode: Domain.ResponseStatuses) {
    super(message);

    this.statusCode = statusCode;
  }
}

export default CustomException;
