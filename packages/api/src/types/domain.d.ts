import HandlerStatus from '@/constants/handler-status';

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

  export type Middleware = (event: Event) => Promise<Domain.Response | void>;

  type Handler = (event: Domain.Event) => Promise<Domain.Response>;

  export type Factory = () => Handler;

  export type ResponseStatuses =
    (typeof HandlerStatus)[keyof typeof HandlerStatus];

  export interface Response {
    statusCode: ResponseStatuses;
    body?: string;
  }
}
