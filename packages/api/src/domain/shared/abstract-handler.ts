import * as Domain from '@/types/domain';

abstract class AbstractHandler {
  abstract handleWith(event: Domain.Event): Promise<Domain.Output>;
}

export default AbstractHandler;
