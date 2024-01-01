import OutputStatus from '@/constants/output-status';
import AbstractHandler from '@/domain/shared/abstract-handler';
import Either from '@/lib/either';
import { reject, resolve } from '@/lib/handler';
import parser from '@/lib/parser';
import { Domain } from '@/types/domain';

import { receivedFieldsSchema } from '../dtos/create-user-dtos';
import CreateUserUseCase from '../use-cases/create-user-use-case';

class CreateUserHandler implements AbstractHandler {
  constructor(private readonly useCase: CreateUserUseCase) {}

  async handleWith(event: Domain.Event): Promise<Domain.Output> {
    const receivedFields = parser.json(event.body, receivedFieldsSchema);

    if (Either.isLeft(receivedFields)) {
      return reject(receivedFields.unwrap());
    }

    const executed = await this.useCase.execute({
      fields: receivedFields.unwrap()
    });

    if (Either.isLeft(executed)) {
      return reject(executed.unwrap());
    }

    return resolve(OutputStatus.NO_CONTENT, executed.unwrap());
  }
}

export default CreateUserHandler;
