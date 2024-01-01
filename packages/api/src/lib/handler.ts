import type { Domain } from '@/types/domain';

import { type UnwrappedLeft, type UnwrappedRight } from './either';
import { snake } from './object';

function response(
  status: Domain.OutputStatuses,
  body: object | null
): Domain.Output {
  const response: Domain.Output = {
    statusCode: status
  };

  if (body) {
    response.body = JSON.stringify(snake(body));
  }

  return response;
}

export function reject(unwrapped: Copy<UnwrappedLeft>) {
  return response(unwrapped.statusCode, unwrapped);
}

export function resolve(
  status: Domain.OutputStatuses,
  unwrapped: UnwrappedRight<object>
) {
  return response(status, unwrapped);
}
