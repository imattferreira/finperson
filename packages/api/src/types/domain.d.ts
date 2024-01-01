import OutputStatus from '@/constants/output-status';

declare namespace Domain {
  interface EventContext {
    user?: {
      userId: string;
    };
  }

  interface Event {
    body: Nullish<string>;
    headers: Record<string, string>;
    metadata?: EventContext;
  }

  type Handler = (event: Domain.Event) => Promise<Domain.Output>;

  type Middleware = (
    event: Domain.Event
  ) => Promise<Domain.Output | Domain.EventContext>;

  export type Factory = () => Handler;
  export type MiddlewareFactory = () => (
    event: Domain.Event
  ) => Promise<Domain.Output | Domain.EventContext>;

  export type OutputStatuses = (typeof OutputStatus)[keyof typeof OutputStatus];

  export interface Output {
    statusCode: OutputStatuses;
    body?: string;
  }
}
