import { type Domain } from '../types/domain';
import { type UnwrappedLeft, type UnwrappedRight } from './either';
import { snake } from './object';

function response(
  status: Domain.ResponseStatuses,
  body: Obj | null
): Domain.Response {
  const response: Domain.Response = {
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
  status: Domain.ResponseStatuses,
  unwrapped: UnwrappedRight<Obj>
) {
  return response(status, unwrapped);
}
