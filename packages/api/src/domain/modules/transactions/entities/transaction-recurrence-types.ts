export const AvailableRecurrencesEnum = {
  YEAR: 'YEAR',
  MONTH: 'MONTH',
  DAY: 'DAY'
} as const;

type AvailableRecurrences = InlineEnum<typeof AvailableRecurrencesEnum>;

interface TransactionRecurrenceFields {
  interval: number;
  repeatTimes: number | null;
  recurrence: AvailableRecurrences;
}

class TransactionRecurrence {
  #interval: number;
  #repeatTimes: number;
  #recurrence: AvailableRecurrences;

  constructor({
    interval,
    recurrence,
    repeatTimes
  }: TransactionRecurrenceFields) {
    this.#interval = interval;
    this.#recurrence = recurrence;
    this.#repeatTimes = repeatTimes ?? 0;
  }

  static create(data: TransactionRecurrenceFields): TransactionRecurrence {
    return new TransactionRecurrence(data);
  }

  get interval(): number {
    return this.#interval;
  }

  get repeatTimes(): number {
    return this.#repeatTimes;
  }

  get recurrence(): AvailableRecurrences {
    return this.#recurrence;
  }
}

export default TransactionRecurrence;
