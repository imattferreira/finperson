import crypto from 'node:crypto';

import { addDays, now } from '@/lib/date';
import { parseJson, stringify } from '@/lib/object';
import { decodeBase64, encodeBase64 } from '@/lib/string';

import ICryptoService from '../interfaces/icrypto-service';

interface TokenPayload {
  exp: number;
  iat: number;
  sub: object;
}

class CryptoService implements ICryptoService {
  readonly #secret = 'hello world'; // transform in a env
  readonly #algorithm = 'sha256';
  readonly #encoding = 'base64url';
  readonly #header = { alg: 'HS256', typ: 'JWT' };
  readonly #payload: TokenPayload = {
    exp: addDays(1),
    iat: now(),
    sub: {}
  };

  validate(token: string): boolean {
    if (!token) {
      return false;
    }

    const parts = token.split('.');

    if (parts.length !== 3) {
      return false;
    }

    const [header, payload, signature] = parts;

    if (header !== encodeBase64(stringify(this.#header))) {
      return false;
    }

    const checksum = this.#concat(header, payload);

    if (!this.#isSigned(signature, checksum)) {
      return false;
    }

    const { exp } = parseJson<TokenPayload>(decodeBase64(payload));

    return !!exp && now() < exp;
  }

  decode<T>(token: string): T {
    const payload = token.split('.')[1];
    const { sub } = parseJson(decodeBase64(payload));

    return sub as T;
  }

  encode<T>(content: T): string {
    const header = encodeBase64(stringify(this.#header));
    const payload = encodeBase64(
      stringify(Object.assign(this.#payload, { sub: content }))
    );
    const checksum = this.#concat(header, payload);

    return this.#concat(checksum, this.#sign(checksum));
  }

  #sign(checksum: string): string {
    return crypto
      .createHmac(this.#algorithm, this.#secret)
      .update(checksum)
      .digest(this.#encoding);
  }

  #isSigned(signature: string, checksum: string): boolean {
    return crypto
      .createVerify(this.#algorithm)
      .update(checksum)
      .verify(this.#secret, signature, this.#encoding);
  }

  #concat(...args: string[]): string {
    return args.reduce((first, second) => first + '.' + second, '').slice(1);
  }
}

export default CryptoService;
