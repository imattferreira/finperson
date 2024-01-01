import CustomException from '@/exceptions/custom-exception';
import type { Domain } from '@/types/domain';

export interface UnwrappedLeft {
  statusCode: Domain.OutputStatuses;
  message: string;
  type: string;
  timestamp: string;
}

export type UnwrappedRight<T extends object> = T;

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

export class Right<T extends object> {
  constructor(private readonly result: T) {}

  unwrap(): UnwrappedRight<T> {
    return this.result;
  }
}

class Either {
  public static isLeft(obj: unknown): obj is Left {
    return obj instanceof Left;
  }

  public static isRight(obj: unknown): obj is Right<Obj> {
    return obj instanceof Right;
  }

  public static toLeft(exception: CustomException): Left {
    return new Left(exception);
  }

  public static toRight<T extends object>(result: T): Right<T> {
    return new Right<T>(result);
  }
}

export default Either;
