import OutputStatus from '@/constants/output-status';

import CustomException from './custom-exception';

class UnknownException extends CustomException {
  constructor() {
    super('unknown server error occur', OutputStatus.UNKNOWN, 'unknown');
  }
}

export default UnknownException;
