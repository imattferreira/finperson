import HandlerStatus from '@/constants/handler-status';
import type { Domain } from '@/types/domain';
import { reject, resolve } from '@/lib/handler';
import parser from '@/lib/parser';
import AuthenticateUseCase from './use-case';
import { receivedFieldsSchema } from './schemas';
import Either from '@/lib/either';

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
