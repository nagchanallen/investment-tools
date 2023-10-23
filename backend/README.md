# Investment Tools - Backend

We use [gin](https://github.com/gin-gonic/gin) for the web server

## Setup

### Firebase

1. Get Firebase adminSDK credentials file from firebase console. [Reference](https://firebase.google.com/docs/admin/setup/)
2. Specify where you put the credentials file in variable `FIREBASE_ADMIN_SDK_CREDENTIALS_FILE` in `.env`. Or you may use the default file path.

### Sentry

For Sentry config, fill in DSN in `SENTRY_DSN`.

### Linter (golangci-lint)

We use [golangci-lint](https://golangci-lint.run/) for linter.
If you want to run linter on local machine. Please follow [this link](https://golangci-lint.run/usage/install/) for installation.

## Development

### Start Development Server

```
make dev
```

Verify the server is running by

```
curl http://localhost:8000/ping
```

### Lint

```
make lint
```

### Format

```
make format
```
