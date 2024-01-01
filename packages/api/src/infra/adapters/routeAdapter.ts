import * as Domain from '@/types/domain';

const routeAdapter = ({
  middlewares = [],
  handler
}: {
  middlewares?: Domain.Middleware[];
  handler: Domain.Handler;
}) => {
  return async (_event: Domain.Event) => {
    const event: Domain.Event = {
      body: _event.body,
      headers: _event.headers,
      metadata: _event.metadata ?? {}
    };

    for (const fn of middlewares) {
      const resolved = await fn(event);

      if (resolved) {
        if ('statusCode' in resolved) {
          return resolved;
        }

        event.metadata = Object.assign(event.metadata || {}, resolved);
      }
    }

    return handler({
      body: event.body,
      headers: event.headers,
      metadata: event.metadata
    });
  };
};

export default routeAdapter;
