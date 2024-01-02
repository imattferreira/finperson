import OutputStatus from '@/constants/output-status';

export interface EventContext {
  user?: {
    userId: string;
  };
}

export interface Event {
  body: Nullish<string>;
  headers: Record<string, string>;
  metadata: EventContext;
  params: Record<string, string>;
  query: Record<string, string>;
}

export type Handler = (event: Event) => Promise<Output>;

export type Middleware = (event: Event) => Promise<Output | EventContext>;

export type Factory = () => Handler;
export type MiddlewareFactory = () => (
  event: Event
) => Promise<Output | EventContext>;

export type OutputStatuses = (typeof OutputStatus)[keyof typeof OutputStatus];

export interface Output {
  statusCode: OutputStatuses;
  body?: string;
}
