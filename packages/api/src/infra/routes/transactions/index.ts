import createTransactionFactory from '../../../domain/transactions/cases/create-transaction';
import middleware from '../../middlewares';
import ensureAuthentication from '../../middlewares/ensure-authentication';

const POST = middleware([ensureAuthentication], createTransactionFactory());

export { POST };
