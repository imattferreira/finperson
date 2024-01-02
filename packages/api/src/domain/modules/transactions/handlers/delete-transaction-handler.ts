import OutputStatus from '@/constants/output-status';
import Either from '@/lib/either';
import { reject, resolve } from '@/lib/handler';
import parser from '@/lib/parser';
import * as Domain from '@/types/domain';

import DeleteTransactionUseCase from '../use-cases/delete-transaction-use-case';

class DeleteTransactionHandler {
  constructor(private readonly useCase: DeleteTransactionUseCase) {}

  async handleWith(event: Domain.Event): Promise<Domain.Output> {
    const { transactionId } = event.params;

    const isTransactionIdValid = parser
      .string()
      .uuid()
      .safeParse(transactionId);

    if (!isTransactionIdValid.success) {
      // TODO fix
      return reject(isTransactionIdValid.error);
    }

    const executed = await this.useCase.execute({
      fields: { transactionId }
    });

    if (Either.isLeft(executed)) {
      return reject(executed.unwrap());
    }

    return resolve(OutputStatus.NO_CONTENT, executed.unwrap());
  }
}

export default DeleteTransactionHandler;
