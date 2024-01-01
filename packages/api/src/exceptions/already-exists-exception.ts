import OutputStatus from '@/constants/output-status';

import CustomException from './custom-exception';

class AlreadyExistsException extends CustomException {
  constructor(message: string) {
    super(message, OutputStatus.CONFLICT, 'already_exists');
  }
}

export default AlreadyExistsException;
