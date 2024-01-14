export const styler = (...styles: string[]): string =>
  styles.reduce((prev, curr) => prev + curr + " ", "").trimEnd();
