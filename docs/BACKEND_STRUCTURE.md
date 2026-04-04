# Backend Structure - Production Level

## Architecture Flow
`Route → Controller → Service → Database → Response`

## Folders
- `config/`: Centralized configuration (DB, Env).
- `controllers/`: Request handling and response dispatching.
- `services/`: Business logic and database operations.
- `routes/`: API endpoint definitions.
- `middleware/`: Authentication, Authorization, Error Handling, Validation.
- `validations/`: Joi schemas for request validation.
- `utils/`: Reusable helpers (Logger, Response Handler).

## Rules
- **Dumb Controllers**: Controllers only handle request/response.
- **Smart Services**: All business logic resides in services.
- **No Direct Env**: Use `config/env.js` for environment variables.
- **Structured Response**: Use `utils/responseHandler.js` for all API responses.
- **Global Error Handling**: Centralized error middleware.
