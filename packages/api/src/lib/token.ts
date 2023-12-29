export function isValidToken(token?: string): token is string {
  if (!token) {
    return false;
  }

  return true;
}

export function decodeToken<T extends Obj>(token: string): T {}
