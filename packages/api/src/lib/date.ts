export const now = (date?: Date): number =>
  date ? date.getTime() : Date.now();

export const addDays = (days: number, date = new Date()): number =>
  date.setDate(date.getDate() + days);
