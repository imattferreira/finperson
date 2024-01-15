import { createMiddleware } from '@solidjs/start/server/middleware';

import authentication from './authentication';

export default createMiddleware({
  onRequest: [authentication]
});
