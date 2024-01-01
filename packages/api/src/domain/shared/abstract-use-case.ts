import { Left, Right } from '@/lib/either';

abstract class AbstractUseCase<I extends object, O = Nullish<object>> {
  abstract execute(data: I): Promise<Left | Right<O>>;
}

export default AbstractUseCase;
