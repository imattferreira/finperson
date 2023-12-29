import type { Domain } from '../../types/domain';

export function middleware(
  middlewares: Domain.Middleware[],
  handler: Domain.Handler
) {
  return async (event: Domain.Event) => {
    for (const fn of middlewares) {
      const result = await fn(event);

      if (result) {
        return result;
      }
    }

    return handler(event);
  };
}

export default middleware;
