import HandlerStatus from '../constants/handler-status';
import CustomException from './custom-exception';

class AlreadyExistsException extends CustomException {
  constructor(message: string) {
    super(message, HandlerStatus.CONFLICT, 'already_exists');
  }
}

export default AlreadyExistsException;
