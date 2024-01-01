import * as Domain from '@/types/domain';

abstract class AbstractMiddleware {
  abstract intermediateWith(
    event: Domain.Event
  ): Promise<Domain.Output | Domain.EventContext>;
}

export default AbstractMiddleware;
