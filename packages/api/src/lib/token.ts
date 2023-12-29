import { createHmac, createVerify } from 'node:crypto';

import { stringify } from './object';
import { decodeBase64, encodeBase64 } from './string';

const secret = 'hello world'; // transform in a env

const getHeader = () => ({ alg: 'HS256', typ: 'JWT' });

function getPayload(content: Obj) {
  const date = new Date();
  const exp = date.setDate(date.getDate() + 1); // expires in 1 day;

  return {
    exp,
    iat: date.getTime(),
    sub: content
  };
}

const getSignature = (checksum: string) =>
  createHmac('sha256', secret).update(checksum).digest('base64url');

export function createToken(content: Obj): string {
  const header = encodeBase64(stringify(getHeader()));
  const payload = encodeBase64(stringify(getPayload(content)));
  const checksum = header + '.' + payload;

  return checksum + '.' + getSignature(checksum);
}

export function isTokenValid(token?: string): token is string {
  if (!token) {
    return false;
  }

  const parts = token.split('.');

  if (parts.length !== 3) {
    return false;
  }

  const [header, payload, signature] = parts;

  if (header !== encodeBase64(stringify(getHeader()))) {
    return false;
  }

  const checksum = header + '.' + payload;

  const isSignatureValid = createVerify('sha256')
    .update(checksum)
    .verify(secret, signature, 'base64url');

  if (!isSignatureValid) {
    return false;
  }

  const { exp } = JSON.parse(decodeBase64(payload));

  if (!exp || Date.now() > exp) {
    return false;
  }

  return true;
}

export function decodeToken<T extends Obj>(token: string): T {
  const payload = token.split('.')[1];
  const { sub } = JSON.parse(decodeBase64(payload));

  return sub as T;
}
