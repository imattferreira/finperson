import * as Domain from '@/types/domain';

import { type UnwrappedLeft, type UnwrappedRight } from './either';
import { isObject, snake, stringify } from './object';

function response(
  status: Domain.OutputStatuses,
  body: Nullish<object>
): Domain.Output {
  const response: Domain.Output = {
    statusCode: status
  };

  if (isObject(body)) {
    response.body = stringify(snake(body));
  }

  return response;
}

export function reject(unwrapped: UnwrappedLeft) {
  return response(unwrapped.statusCode, unwrapped);
}

export function resolve(
  status: Domain.OutputStatuses,
  unwrapped: UnwrappedRight
) {
  return response(status, unwrapped);
}
