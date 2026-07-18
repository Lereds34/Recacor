import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV,
    sendDefaultPii: false,
    tracesSampleRate: 0.05,
    beforeSend(event) {
      const exception = event.exception?.values?.[0];
      const errorMessage = exception?.value ?? event.message ?? "";
      const embeddedBrowserBridgeErrors = [
        "Error invoking postMessage: Java object is gone",
        "Error invoking enableDidUserTypeOnKeyboardLogging: Java object is gone",
        "undefined is not an object (evaluating 'window.webkit.messageHandlers')",
      ];
      const isEmbeddedBrowserBridgeNoise = embeddedBrowserBridgeErrors.some((message) =>
        errorMessage.includes(message),
      );

      if (isEmbeddedBrowserBridgeNoise) return null;

      delete event.user;
      if (event.request) {
        delete event.request.cookies;
        delete event.request.data;
      }
      return event;
    },
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
