export const AvailableRecurrencesEnum = {
  YEAR: 'YEAR',
  MONTH: 'MONTH',
  DAY: 'DAY'
} as const;

type AvailableRecurrences = InlineEnum<typeof AvailableRecurrencesEnum>;

interface TransactionRecurrenceFields {
  each: number;
  repeatTimes: number | null;
  recurrence: AvailableRecurrences;
}

class TransactionRecurrence {
  #each: number;
  #repeatTimes: number;
  #recurrence: AvailableRecurrences;

  constructor({ each, recurrence, repeatTimes }: TransactionRecurrenceFields) {
    this.#each = each;
    this.#recurrence = recurrence;
    this.#repeatTimes = repeatTimes ?? 0;
  }

  static create(data: TransactionRecurrenceFields): TransactionRecurrence {
    return new TransactionRecurrence(data);
  }

  get each(): number {
    return this.#each;
  }

  get repeatTimes(): number {
    return this.#repeatTimes;
  }

  get recurrence(): AvailableRecurrences {
    return this.#recurrence;
  }
}

export default TransactionRecurrence;
