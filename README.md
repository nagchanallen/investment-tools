# investment-tools

A website that provides variety of tools for personal long-term investment.

## Requirements

### Web (Website)

1. node.js 20+
2. yarn

### Backend

1. Go 1.21+

## Setup Project

### Common

Run `make setup` for setting up codebase

#### Firebase

We use Firebase for user authentication and Firestore for storage (NoSQL).

Here we need to create a firebase project for this project.

#### Sentry

We use Sentry for performance monitoring and error tracking.

We need to have two sentry project for website and backend each.

### Web (Website)

### Config

You need to fill environment variables in `web/.env` to start the website for development

#### Firebase

For firebase config, fill in variables with prefix `APP_FIREBASE`.

#### Sentry

For Sentry config, fill in DSN in `APP_SENTRY_DSN`.

### Backend

You need to fill environment variables in `backend/.env` to start the backend server for development

#### Firebase

1. Get Firebase adminSDK credentials file from firebase console. [Reference](https://firebase.google.com/docs/admin/setup/)
2. Specify where you put the credentials file in variable `FIREBASE_ADMIN_SDK_CREDENTIALS_FILE` in `.env`. Or you may use the default file path.
3. Update the firestore rules by replacing with the rules [here](/backend/docs/firebase_rules.md)

#### Sentry

For Sentry config, fill in DSN in `SENTRY_DSN`.

#### Linter (golangci-lint)

We use [golangci-lint](https://golangci-lint.run/) for linter.
If you want to run linter on local machine. Please follow [this link](https://golangci-lint.run/usage/install/) for installation.

## Development

Please refer to development section for website and backend.

- [Web](web/README.md)
- [Backend](backend/README.md)
