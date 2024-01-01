import OutputStatus from '@/constants/output-status';

declare namespace Domain {
  interface EventContext {
    user: {
      userId: string;
    };
  }

  export interface Event {
    body: string | null;
    headers: Record<string, string>;
    ctx?: EventContext;
  }

  export type Middleware = (event: Event) => Promise<Domain.Output | void>;

  type Handler = (event: Domain.Event) => Promise<Domain.Output>;

  export type Factory = () => Handler;

  export type OutputStatuses = (typeof OutputStatus)[keyof typeof OutputStatus];

  export interface Output {
    statusCode: OutputStatuses;
    body?: string;
  }
}
