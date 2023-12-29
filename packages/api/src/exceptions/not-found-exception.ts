import HandlerStatus from '../constants/handler-status';
import CustomException from './custom-exception';

class NotFoundException extends CustomException {
  constructor(message: string) {
    super(message, HandlerStatus.NOT_FOUND, 'not_found');
  }
}

export default NotFoundException;
