import HandlerStatus from '@/constants/handler-status';
import Either from '@/lib/either';
import { reject, resolve } from '@/lib/handler';
import parser from '@/lib/parser';
import type { Domain } from '@/types/domain';

import { receivedFieldsSchema } from '../dtos/authenticate-dtos';
import AuthenticateUseCase from '../use-cases/authenticate-use-case';

class AuthenticateHandler {
  constructor(private readonly useCase: AuthenticateUseCase) {}

  async handleWith(event: Domain.Event): Promise<Domain.Response> {
    const receivedFields = parser.json(event.body, receivedFieldsSchema);

    if (Either.isLeft(receivedFields)) {
      return reject(receivedFields.unwrap());
    }

    const executed = await this.useCase.execute(receivedFields.unwrap());

    if (Either.isLeft(executed)) {
      return reject(executed.unwrap());
    }

    return resolve(HandlerStatus.OK, executed.unwrap());
  }
}

export default AuthenticateHandler;
