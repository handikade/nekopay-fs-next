# Gemini Interaction Guide for nekopay-fs-next

This document provides guidance for interacting with the Gemini AI assistant in the context of this project. Providing this information will help Gemini understand the project and assist you more effectively.

## Basic

Don't change any code unless I explicitly tell you to do so.

## Project Architecture

The project follows a layered architecture, specifically a **Service-Repository Pattern**, for its modules. When creating new modules, please adhere to this pattern.

The layers are organized as follows within a module (e.g., `modules/user`):

1.  **`schema.ts`**: Defines the Mongoose schema for the data model. This is the source of truth for the data structure and database-level validation.
2.  **`model.ts`**: Creates the Mongoose model from the schema. This is the main interface for database collection interaction.
3.  **`dto.ts`** (Data Transfer Object): Defines data shapes for API inputs using `zod` for validation. This ensures data integrity at the application's entry points.
4.  **`repository.ts`**: The data access layer. It abstracts all database operations (e.g., `create`, `findByEmail`) and interacts directly with the Mongoose model. This keeps database logic isolated.
5.  **`service.ts`**: The business logic layer. It orchestrates application functionality by calling methods on the repository. It should not interact directly with the database model.
6.  **API Route** (e.g., `app/api/user/.../route.ts`): The controller layer. It handles HTTP requests, calls the appropriate service methods, and returns the response.

By keeping these concerns separate, the codebase remains clean, testable, and maintainable.
