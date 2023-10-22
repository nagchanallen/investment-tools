# Investment Tools - Backend

We use [gin](https://github.com/gin-gonic/gin) for the web server

## Setup

### Firebase

1. Get Firebase adminSDK credentials file from firebase console. [Reference](https://firebase.google.com/docs/admin/setup/)
2. Specify where you put the credentials file in variable `FIREBASE_ADMINSDK_CREDENTIALS_FILE` in `.env`. Or you may use the default file path.

## Start Development Server

```
make dev
```

Verify the server is running by

```
curl http://localhost:8000/ping
```
