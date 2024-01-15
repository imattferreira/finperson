import type { FetchEvent } from '@solidjs/start/server/types';
import { getCookie, sendRedirect } from 'vinxi/server';

const UNPROTECTED_ROUTES = ['/login'];

function authenticate(event: FetchEvent) {
  const { pathname } = new URL(event.request.url);

  if (!UNPROTECTED_ROUTES.includes(pathname)) {
    event.request.headers.getSetCookie();

    const user = getCookie(event, 'loggedin-user');

    if (!user) {
      return sendRedirect(event, '/login');
    }

    // TODO set user
    // event.locals = user;
  }
}

export default authenticate;
