import HandlerStatus from '@/constants/handler-status';
import CustomException from './custom-exception';

class UnauthorizedException extends CustomException {
  constructor(message: string) {
    super(message, HandlerStatus.UNAUTHORIZED, 'unauthorized');
  }
}

export default UnauthorizedException;
