export type SubmitElementEvent<T> = Event & {
  submitter: HTMLElement;
} & {
  currentTarget: T;
  target: Element;
};

export type ChangeElementEvent<T> = Event & {
  currentTarget: T;
  target: HTMLInputElement;
};
