export function isValidToken(token?: string): token is string {
  if (!token) {
    return false;
  }

  return true;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function decodeToken<T extends Obj>(token: string): T {
  return { a: 'test' } as unknown as T;
}
