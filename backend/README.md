# Investment Tools - Backend

We use [gin](https://github.com/gin-gonic/gin) for the web server

## Development

### Start Development Server

```
make dev
```

Verify the server is running by

```
curl http://localhost:8000/ping
```

### Format and Lint

Before committing the code, run format and linter first and fix the issues:

```
make format
make lint
```
