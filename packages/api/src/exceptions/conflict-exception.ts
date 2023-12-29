import HandlerStatus from '../constants/handler-status';
import CustomException from './custom-exception';

class ConflictException extends CustomException {
  constructor(message: string) {
    super(message, HandlerStatus.CONFLICT, 'conflict');
  }
}

export default ConflictException;
