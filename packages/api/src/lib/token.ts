import { createHmac, createVerify } from 'node:crypto';

import { addDays, now } from './date';
import { parseJson, stringify } from './object';
import { decodeBase64, encodeBase64 } from './string';

const secret = 'hello world'; // transform in a env
const algorithm = 'sha256';

interface TokenPayload {
  exp: number;
  iat: number;
  sub: object;
}

const getHeader = () => ({ alg: 'HS256', typ: 'JWT' });

const getPayload = (content: object): TokenPayload => ({
  exp: addDays(1),
  iat: now(),
  sub: content
});

const getSignature = (checksum: string) =>
  createHmac(algorithm, secret).update(checksum).digest('base64url');

export function createToken<T extends object>(content: T): string {
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

  const isSignatureValid = createVerify(algorithm)
    .update(checksum)
    .verify(secret, signature, 'base64url');

  if (!isSignatureValid) {
    return false;
  }

  const { exp } = parseJson<TokenPayload>(decodeBase64(payload));

  if (!exp || now() > exp) {
    return false;
  }

  return true;
}

export function decodeToken<T extends object>(token: string): T {
  const payload = token.split('.')[1];
  const { sub } = JSON.parse(decodeBase64(payload));

  return sub as T;
}
