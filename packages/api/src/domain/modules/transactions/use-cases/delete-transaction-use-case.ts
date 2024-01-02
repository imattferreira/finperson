import AbstractUseCase from '@/core/abstract-use-case';
import Either, { Left, Right } from '@/lib/either';

import ITransactionsRepository from '../repositories/interfaces/itransactions-repository';

interface Input {
  fields: {
    transactionId: string;
  };
}

type Output = null;

class DeleteTransactionUseCase implements AbstractUseCase<Input, Output> {
  constructor(
    private readonly transactionsRepository: ITransactionsRepository
  ) {}

  async execute({ fields }: Input): Promise<Left | Right<Output>> {
    await this.transactionsRepository.delete(fields.transactionId);

    return Either.toRight(null);
  }
}

export default DeleteTransactionUseCase;
