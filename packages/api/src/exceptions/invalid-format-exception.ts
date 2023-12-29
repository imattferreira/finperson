import HandlerStatus from '../constants/handler-status';
import CustomException from './custom-exception';

class InvalidFormatException extends CustomException {
  constructor(message: string) {
    super(message, HandlerStatus.BAD);
  }
}

export default InvalidFormatException;
