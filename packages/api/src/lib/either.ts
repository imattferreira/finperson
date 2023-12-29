import CustomException from '../exceptions/custom-exception';
import { type Domain } from '../types/domain';

export interface UnwrappedLeft {
  statusCode: Domain.ResponseStatuses;
  message: string;
  type: string;
  timestamp: string;
}

export type UnwrappedRight = object | null;

export class Left {
  constructor(private readonly exception: CustomException) {}

  unwrap(): UnwrappedLeft {
    return {
      statusCode: this.exception.statusCode,
      message: this.exception.message,
      type: this.exception.type,
      timestamp: new Date().toUTCString()
    };
  }
}

export class Right {
  constructor(readonly result: Record<string, unknown> | null) {}

  unwrap(): UnwrappedRight {
    return this.result;
  }
}

class Either {
  public static isLeft(obj: unknown): obj is Left {
    return obj instanceof Left;
  }

  public static isRight(obj: unknown): obj is Right {
    return obj instanceof Right;
  }

  public static toLeft(exception: CustomException): Left {
    return new Left(exception);
  }

  public static toRight(result: Record<string, unknown> | null): Right {
    return new Right(result);
  }
}

export default Either;
