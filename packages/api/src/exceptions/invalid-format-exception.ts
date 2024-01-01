import OutputStatus from '@/constants/output-status';

import CustomException from './custom-exception';

class InvalidFormatException extends CustomException {
  constructor(message: string) {
    super(message, OutputStatus.BAD, 'invalid_format');
  }
}

export default InvalidFormatException;
