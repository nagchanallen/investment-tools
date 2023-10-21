# Investment Tools - Web

We use React for website development.

## Development

### Development Setup

```
make setup
```

### Config

You need to fill environment variables in `.env` to start the website for development

#### Firebase

For firebase config, fill in variables with prefix `APP_FIREBASE`.

#### Sentry

For Sentry config, fill in DSN in `APP_SENTRY_DSN`.

### Run React App for development

```
make vendor
make dev
```

Before committing the code, run format and linter first and fix the issues:

```
make format
make lint
```
