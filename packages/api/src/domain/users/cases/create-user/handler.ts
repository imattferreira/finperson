import HandlerStatus from '../../../../constants/handler-status';
import Either from '../../../../lib/either';
import { reject, resolve } from '../../../../lib/handler';
import parser from '../../../../lib/parser';
import { Domain } from '../../../../types/domain';
import { receivedFieldsSchema } from './schemas';
import CreateUserUseCase from './use-case';

class CreateUserHandler {
  constructor(private readonly useCase: CreateUserUseCase) {}

  async handleWith(event: Domain.Event): Promise<Domain.Response> {
    const receivedFields = parser.json(event.body, receivedFieldsSchema);

    if (Either.isLeft(receivedFields)) {
      return reject(receivedFields.unwrap());
    }

    const executed = await this.useCase.execute(receivedFields.unwrap());

    if (Either.isLeft(executed)) {
      return reject(executed.unwrap());
    }

    return resolve(HandlerStatus.CREATED, executed.unwrap());
  }
}

export default CreateUserHandler;
