import createTransactionFactory from '@/domain/transactions/cases/create-transaction';
import middleware from '@/infra/middlewares';
import ensureAuthentication from '@/infra/middlewares/ensure-authentication';

const POST = middleware([ensureAuthentication], createTransactionFactory());

export { POST };
