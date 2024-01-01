import { Left, Right } from '@/lib/either';

abstract class AbstractUseCase<I extends object, O = object | null> {
  abstract execute(data: I): Promise<Left | Right<O>>;
}

export default AbstractUseCase;
