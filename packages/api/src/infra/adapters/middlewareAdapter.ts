import * as Domain from '@/types/domain';

const middlewareAdapter =
  (middleware: Domain.Middleware) => (event: Domain.Event) =>
    middleware(event);

export default middlewareAdapter;
