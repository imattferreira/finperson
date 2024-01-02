import * as Domain from '@/types/domain';

import ListTransactionsOfMonthHandler from '../handlers/list-transactions-of-month-handler';
import makeListTransactionsOfMonthUseCaseFactory from '../use-cases/factories/make-list-transactions-of-month-use-case-factory';

const makeListTransactionsOfMonthFactory: Domain.Factory = () => {
  const handler = new ListTransactionsOfMonthHandler(
    makeListTransactionsOfMonthUseCaseFactory()
  );

  return (event) => handler.handleWith(event);
};

export default makeListTransactionsOfMonthFactory;
