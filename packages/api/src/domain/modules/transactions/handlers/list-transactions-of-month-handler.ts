import OutputStatus from '@/constants/output-status';
import Either from '@/lib/either';
import { reject, resolve } from '@/lib/handler';
import IParserService from '@/services/interfaces/iparser-service';
import * as Domain from '@/types/domain';

import {
  ReceivedFields,
  receivedFiltersSchema
} from '../dtos/list-transactions-of-month-dtos';
import ListTransactionsOfMonthUseCase from '../use-cases/list-transactions-of-month-use-case';

class ListTransactionsOfMonthHandler {
  constructor(
    private readonly useCase: ListTransactionsOfMonthUseCase,
    private readonly parserService: IParserService
  ) {}

  async handleWith(event: Domain.Event): Promise<Domain.Output> {
    const receivedFields = this.parserService.parseObj<ReceivedFields>(
      event.query,
      receivedFiltersSchema
    );

    if (Either.isLeft(receivedFields)) {
      return reject(receivedFields.unwrap());
    }

    const executed = await this.useCase.execute({
      filters: receivedFields.unwrap()
    });

    if (Either.isLeft(executed)) {
      return reject(executed.unwrap());
    }

    return resolve(OutputStatus.OK, executed.unwrap());
  }
}

export default ListTransactionsOfMonthHandler;
