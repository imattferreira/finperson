export function styler(...styles: (string | boolean | undefined)[]): string {
  const result = [];

  for (const style of styles) {
    if (typeof style === 'string') {
      result.push(style);
    }
  }

  return result.join(' ');
}
