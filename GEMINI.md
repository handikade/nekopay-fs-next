# Gemini Interaction Guide for nekopay-fs-next

This document provides guidance for interacting with the Gemini AI assistant in the context of this project. Providing this information will help Gemini understand the project and assist you more effectively.

## Basic

Don't change any code unless I explicitly tell you to do so.

## Project Architecture

The project follows a layered architecture, specifically a **Service-Repository Pattern**, for its modules. When creating new modules, please adhere to this pattern.

The layers are organized as follows within a module (e.g., `modules/user`):

1.  **`schema.ts`**: Defines the Mongoose schema for the data model. This is the source of truth for the data structure and database-level validation. When creating a schema, also implement its corresponding TypeScript types using `InferSchemaType<typeof yourSchema>` and `HydratedDocument<YourType>`, similar to `modules/user/schema.ts`.
2.  **`model.ts`**: Creates the Mongoose model from the schema. This is the main interface for database collection interaction.
3.  **`dto.ts`** (Data Transfer Object): Defines data shapes for API inputs using `zod` for validation. This ensures data integrity at the application's entry points.
4.  **`repository.ts`**: The data access layer. It abstracts all database operations (e.g., `create`, `findByEmail`) and interacts directly with the Mongoose model. This keeps database logic isolated.
5.  **`service.ts`**: The business logic layer. It orchestrates application functionality by calling methods on the repository. It should not interact directly with the database model.
6.  **API Route** (e.g., `app/api/user/.../route.ts`): The controller layer. It handles HTTP requests, calls the appropriate service methods, and returns the response.

By keeping these concerns separate, the codebase remains clean, testable, and maintainable.

### Data Access Strategy

- **Internal Pages (Server Components)**: For pages rendered within the Next.js application, prefer using **Server Components** that call the `service` layer directly. This is more performant as it avoids an unnecessary network hop.

- **External Consumers**: API Routes (e.g., `app/api/.../route.ts`) should be created to expose functionality to external clients or for client-side components that need to fetch data. These routes will call the `service` layer to execute business logic.

## Zod Best Practices

When working with Zod, please adhere to the following conventions:

*   **Email Validation**: Always use `z.email()` instead of the deprecated `z.string().email()`.
*   **DTO Schemas**: For `create` and `update` DTOs, create a shared base schema. Use `.omit()` or `.pick()` to create specific DTOs.
*   **Update DTOs**: To ensure at least one field is provided in an update, use `.refine()` or `.superRefine()` to check that the input object is not empty.
*   **Omit/Pick Usage**: The `.omit()` and `.pick()` methods expect an object where the keys are the fields to omit/pick, e.g., `.omit({ fieldToOmit: true })`. Do not use an array of strings.
