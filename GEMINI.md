# Gemini Interaction Guide for nekopay-fs-next

This document provides guidance for interacting with the Gemini AI assistant in the context of this project. Providing this information will help Gemini understand the project and assist you more effectively.

## Basic

Don't change any code unless I explicitly tell you to do so.

## Project Overview

(Briefly describe the project's purpose and what it does. For example: "nekopay-fs-next is a Next.js application for managing financial transactions.")

## Getting Started

(Provide the steps to set up the development environment and run the project locally.)

1.  Install dependencies: `pnpm install`
2.  Run the development server: `pnpm dev`

## Project Structure

(Provide a brief overview of the key directories and files in the project.)

- `app/`: Contains the Next.js pages and API routes.
- `lib/`: Contains shared library code, such as database connections and error handling.
- `modules/`: Contains the business logic for different modules of the application (e.g., auth, user, partners).
- `public/`: Contains static assets.

## Development Workflow

(Describe the typical development workflow, including how to run tests, linting, and other quality checks.)

- **Running tests:** (Provide the command to run tests, e.g., `pnpm test`)
- **Linting:** `pnpm lint`
- **Type checking:** `pnpm tsc`

## Interaction Guide

(Provide any specific instructions or preferences for interacting with Gemini.)

- **Be specific in your requests.** Instead of "fix the bug," try "The login form is not submitting correctly. The error seems to be in the `app/api/auth/login/route.ts` file."
- **Provide context.** If you're working on a specific file, mention it in your request.
- **Specify conventions.** If your project has specific coding conventions, mention them here.

## Important Commands

(List any other important commands that are used in the project.)

- `pnpm build`: Creates a production build of the application.
