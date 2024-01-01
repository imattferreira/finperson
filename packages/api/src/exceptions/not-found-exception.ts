import OutputStatus from '@/constants/output-status';

import CustomException from './custom-exception';

class NotFoundException extends CustomException {
  constructor(message: string) {
    super(message, OutputStatus.NOT_FOUND, 'not_found');
  }
}

export default NotFoundException;
