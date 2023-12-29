export const encodeBase64 = (str: string): string =>
  Buffer.from(str).toString('base64url');

export const decodeBase64 = (str: string): string => atob(str);

export function snakecase(str: string): string {
  const result = [];

  for (let i = 0; i < str.length; i++) {
    const letter = str[i];

    if (letter !== letter.toUpperCase()) {
      result.push(letter);
      continue;
    }

    result.push('_', letter.toLowerCase());
  }

  return result.join('').trim();
}

export function camelcase(str: string): string {
  const result = [];

  for (let i = 0; i < str.length; i++) {
    const letter = str[i];

    if (letter !== '_') {
      result.push(letter);
      continue;
    }

    result.push(str[i + 1].toUpperCase());
  }

  return result.join('').trim();
}
