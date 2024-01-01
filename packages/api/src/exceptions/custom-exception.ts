import type { Domain } from '@/types/domain';

class CustomException extends Error {
  public statusCode: Domain.OutputStatuses;
  public type: string;

  constructor(
    message: string,
    statusCode: Domain.OutputStatuses,
    type: string
  ) {
    super(message);

    this.statusCode = statusCode;
    this.type = type;
  }
}

export default CustomException;
