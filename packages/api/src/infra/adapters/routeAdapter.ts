import type { APIGatewayProxyEvent } from 'aws-lambda';

import UnknownException from '@/exceptions/unknown-exception';
import Either from '@/lib/either';
import { reject } from '@/lib/handler';
import * as Domain from '@/types/domain';

const routeAdapter = ({
  middlewares = [],
  handler
}: {
  middlewares?: Domain.Middleware[];
  handler: Domain.Handler;
}) => {
  return async (_event: APIGatewayProxyEvent) => {
    try {
      const event: Domain.Event = {
        body: _event.body,
        headers: _event.headers as Record<string, string>,
        metadata: {},
        query: _event.queryStringParameters as Record<string, string>
      };

      for (const fn of middlewares) {
        const resolved = await fn(event);

        if (resolved) {
          if ('statusCode' in resolved) {
            return resolved;
          }

          event.metadata = Object.assign(event.metadata, resolved);
        }
      }

      return handler(event);
    } catch {
      return reject(Either.toLeft(new UnknownException()).unwrap());
    }
  };
};

export default routeAdapter;
