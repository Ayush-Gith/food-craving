# Copilot Instructions for Food Cravings Backend

## Project Overview
- **Purpose:** RESTful API for a food-centric social platform (user auth, food partners, food items, likes, comments, bookmarks).
- **Stack:** Node.js (18+), Express.js, MongoDB (Mongoose), JWT, dotenv.
- **Architecture:** Modular MVC. Key layers: routes → controllers → services/models → db. Middleware for auth and error handling.

## Key Components & Data Flow
- **Entry Point:** `server.js` (starts Express, loads `src/app.js`).
- **App Setup:** `src/app.js` (middleware, routes, error handling).
- **Database:** `src/db/db.js` (MongoDB connection via Mongoose).
- **Models:** `src/models/` (Mongoose schemas for users, food, partners, likes, comments, bookmarks).
- **Controllers:** `src/controllers/` (business logic for each resource, e.g., `food.controller.js`).
- **Routes:** `src/routes/` (maps endpoints to controllers, e.g., `/api/food`).
- **Middleware:** `src/middlewares/` (e.g., `auth.middleware.js` for JWT auth).
- **Services:** `src/services/` (e.g., `storage.service.js` for file/storage logic).

## Developer Workflows
- **Start server:** `npm start` (default: http://localhost:3000)
- **Environment:** Configure `.env` (see `README.md` for required keys)
- **MongoDB:** Local or cloud URI in `MONGODB_URI`
- **No built-in test scripts** (add tests in `src/` if needed)

## Project Conventions
- **Controllers**: Only business logic, no direct DB or request/response handling.
- **Routes**: Thin, only map endpoints to controllers.
- **Models**: All MongoDB schemas in `src/models/`.
- **JWT Auth**: All protected routes use `auth.middleware.js`.
- **Error Handling**: Centralized in `src/app.js`.
- **File Naming**: Use kebab-case for files, camelCase for variables.

## Integration & Patterns
- **External Services:** Only MongoDB (via Mongoose). No other external APIs by default.
- **Adding Features:**
  1. Create/update model in `src/models/`
  2. Add controller logic in `src/controllers/`
  3. Register route in `src/routes/`
  4. Add middleware if needed
- **Example:** To add a new social feature (e.g., sharing):
  - Add `share.model.js`, `share.controller.js`, `share.route.js`
  - Wire up in `src/app.js`

## References
- See `README.md` for architecture diagram, setup, and environment details.
- Use existing controllers/routes as templates for new features.

---

_If you are unsure about a workflow or pattern, check `README.md` or existing files in `src/` for examples._
