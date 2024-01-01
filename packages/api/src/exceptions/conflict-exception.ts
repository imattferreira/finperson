import OutputStatus from '@/constants/output-status';

import CustomException from './custom-exception';

class ConflictException extends CustomException {
  constructor(message: string) {
    super(message, OutputStatus.CONFLICT, 'conflict');
  }
}

export default ConflictException;
