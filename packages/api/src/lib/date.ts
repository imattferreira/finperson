const DAY = 1000 * 60 * 60 * 24;
const MONTH = DAY * 30;

export const now = (date?: Date): number =>
  date ? date.getTime() : Date.now();

export const addDays = (days: number, date = new Date()): number =>
  date.setDate(date.getDate() + days);

export const diff = (first: number | string, second: number | string): number =>
  new Date(first).getTime() - new Date(second).getTime();

export const diffInDays = (
  first: number | string,
  second: number | string
): number => Math.floor(diff(first, second) / DAY);

export const diffInMonths = (
  first: number | string,
  second: number | string
): number => Math.floor(diff(first, second) / MONTH);

export const getYear = (): number => new Date().getFullYear();
