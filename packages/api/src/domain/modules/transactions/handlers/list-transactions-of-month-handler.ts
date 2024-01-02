import OutputStatus from '@/constants/output-status';
import Either from '@/lib/either';
import { reject, resolve } from '@/lib/handler';
import * as Domain from '@/types/domain';

import { receivedFiltersSchema } from '../dtos/list-transactions-of-month-dtos';
import ListTransactionsOfMonthUseCase from '../use-cases/list-transactions-of-month-use-case';

class ListTransactionsOfMonthHandler {
  constructor(private readonly useCase: ListTransactionsOfMonthUseCase) {}

  async handleWith(event: Domain.Event): Promise<Domain.Output> {
    const receivedFields = receivedFiltersSchema.safeParse(event.query);

    if (!receivedFields.success) {
      // TODO fix
      return reject(receivedFields.error);
    }

    const executed = await this.useCase.execute({
      filters: receivedFields.data
    });

    if (Either.isLeft(executed)) {
      return reject(executed.unwrap());
    }

    return resolve(OutputStatus.CREATED, executed.unwrap());
  }
}

export default ListTransactionsOfMonthHandler;
