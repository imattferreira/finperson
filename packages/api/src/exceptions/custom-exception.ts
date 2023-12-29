import { Domain } from '@/types/domain';

class CustomException extends Error {
  public statusCode: Domain.ResponseStatuses;
  public type: string;

  constructor(
    message: string,
    statusCode: Domain.ResponseStatuses,
    type: string
  ) {
    super(message);

    this.statusCode = statusCode;
    this.type = type;
  }
}

export default CustomException;
