import OutputStatus from '@/constants/output-status';

import CustomException from './custom-exception';

class UnauthorizedException extends CustomException {
  constructor(message: string) {
    super(message, OutputStatus.UNAUTHORIZED, 'unauthorized');
  }
}

export default UnauthorizedException;
