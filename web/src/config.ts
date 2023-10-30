const Config = {
  firebase: {
    apiKey: import.meta.env.APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.APP_FIREBASE_MEASUREMENT_ID,
  },
  sentry: {
    dsn: import.meta.env.APP_SENTRY_DSN,
  },
  apiBaseUrl: import.meta.env.APP_API_BASE_URL,
}

export default Config
