import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  /**
   * Extends the built-in session.user object to include id and roles.
   */
  interface Session {
    user: {
      id: string;
      roles: string[];
    } & DefaultSession["user"]; // Keep the default properties
  }

  /**
   * Extends the built-in User model to include id and roles.
   * This is what is returned from the `authorize` callback.
   */
  interface User {
    id: string;
    roles: string[];
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends the built-in JWT token to include id and roles.
   */
  interface JWT {
    id: string;
    roles: string[];
  }
}
