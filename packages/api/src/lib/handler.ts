import { type Domain } from '../types/domain';
import { type UnwrappedLeft, type UnwrappedRight } from './either';

function response(
  status: Domain.ResponseStatuses,
  body: object | null
): Domain.Response {
  const response: Domain.Response = {
    statusCode: status
  };

  if (body) {
    response.body = JSON.stringify(body);
  }

  return response;
}

export function reject(unwrapped: UnwrappedLeft) {
  return response(unwrapped.statusCode, unwrapped);
}

export function resolve(
  status: Domain.ResponseStatuses,
  unwrapped: UnwrappedRight
) {
  return response(status, unwrapped);
}
