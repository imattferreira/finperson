import AbstractUseCase from '@/core/abstract-use-case';
import Either, { Left, Right } from '@/lib/either';

import { ListTransactionsOfMonthReceivedFilters } from '../dtos/list-transactions-of-month-dtos';
import Transaction from '../entities/transaction';
import ITransactionsRepository from '../repositories/interfaces/itransactions-repository';

interface Input {
  filters: ListTransactionsOfMonthReceivedFilters;
}

// TODO padronize output returns
interface Output {
  transactions: Transaction[];
}

class ListTransactionsOfMonthUseCase implements AbstractUseCase<Input, Output> {
  constructor(
    private readonly transactionsRepository: ITransactionsRepository
  ) {}
  async execute({ filters }: Input): Promise<Left | Right<Output>> {
    const transactions = await this.transactionsRepository.findAll({ filters });

    return Either.toRight({ transactions });
  }
}

export default ListTransactionsOfMonthUseCase;
