import OutputStatus from '@/constants/output-status';
import Either from '@/lib/either';
import { reject, resolve } from '@/lib/handler';
import IParserService from '@/services/interfaces/iparser-service';
import * as Domain from '@/types/domain';

import { receivedFieldsSchema } from '../dtos/create-transaction-dtos';
import CreateTransactionUseCase from '../use-cases/create-transaction-use-case';

class CreateTransactionHandler {
  constructor(
    private readonly useCase: CreateTransactionUseCase,
    private readonly parserService: IParserService
  ) {}

  async handleWith(event: Domain.Event): Promise<Domain.Output> {
    const receivedFields = this.parserService.parseJson(
      event.body,
      receivedFieldsSchema
    );

    if (Either.isLeft(receivedFields)) {
      return reject(receivedFields.unwrap());
    }

    const executed = await this.useCase.execute({
      fields: receivedFields.unwrap()
    });

    if (Either.isLeft(executed)) {
      return reject(executed.unwrap());
    }

    return resolve(OutputStatus.CREATED, executed.unwrap());
  }
}

export default CreateTransactionHandler;
