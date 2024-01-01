import OutputStatus from '@/constants/output-status';
import Either from '@/lib/either';
import { reject, resolve } from '@/lib/handler';
import parser from '@/lib/parser';
import type { Domain } from '@/types/domain';

import { receivedFieldsSchema } from '../dtos/create-transaction-dtos';
import CreateTransactionUseCase from '../use-cases/create-transaction-use-case';

class CreateTransactionHandler {
  constructor(private readonly useCase: CreateTransactionUseCase) {}

  async handleWith(event: Domain.Event): Promise<Domain.Output> {
    const receivedFields = parser.json(event.body, receivedFieldsSchema);

    if (Either.isLeft(receivedFields)) {
      return reject(receivedFields.unwrap());
    }

    const executed = await this.useCase.execute(receivedFields.unwrap());

    if (Either.isLeft(executed)) {
      return reject(executed.unwrap());
    }

    return resolve(OutputStatus.CREATED, executed.unwrap());
  }
}

export default CreateTransactionHandler;
