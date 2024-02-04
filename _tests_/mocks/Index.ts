async function initMocks() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    server.listen();
  } else {
    const { worker } = await import('./browser');
    worker.start({
      onUnhandledRequest(request) {
        // Whenever there's an unhandled request which path
        // starts from "/_next", ignore it.
        if (request.url.startsWith('/_next')) {
          return;
        }

        console.warn('Unhandled: %s %s', request.method, request.url);
        // onUnhandledRequest: 'bypass'
      },
    });
  }
}

initMocks();

export {};
