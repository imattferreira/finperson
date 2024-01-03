import OutputStatus from '@/constants/output-status';
import Either from '@/lib/either';
import { reject, resolve } from '@/lib/handler';
import IParserService from '@/services/interfaces/iparser-service';
import * as Domain from '@/types/domain';

import DeleteTransactionUseCase from '../use-cases/delete-transaction-use-case';

class DeleteTransactionHandler {
  constructor(
    private readonly useCase: DeleteTransactionUseCase,
    private readonly parserService: IParserService
  ) {}

  async handleWith(event: Domain.Event): Promise<Domain.Output> {
    const transactionId = this.parserService.uuid(event.params?.transactionId);

    if (Either.isLeft(transactionId)) {
      return reject(transactionId.unwrap());
    }

    const executed = await this.useCase.execute({
      fields: { transactionId: transactionId.unwrap() }
    });

    if (Either.isLeft(executed)) {
      return reject(executed.unwrap());
    }

    return resolve(OutputStatus.NO_CONTENT, executed.unwrap());
  }
}

export default DeleteTransactionHandler;
