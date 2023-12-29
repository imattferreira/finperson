import HandlerStatus from '../constants/handler-status';

declare namespace Domain {
  export interface Event {
    body: string | null;
  }

  export type Factory = () => (event: Domain.Event) => Promise<Domain.Response>;

  export type ResponseStatuses =
    (typeof HandlerStatus)[keyof typeof HandlerStatus];

  export interface Response {
    statusCode: ResponseStatuses;
    body?: string;
  }
}
