import { z } from "zod";

export const userRoleSchema = z.enum(["user", "admin"]);
export type UserRole = z.infer<typeof userRoleSchema>;

export const userAddressSchema = z.object({
  address1: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
});

const userWriteBaseSchema = z.object({
  email: z.email(),
  password: z.string(),
  userName: z.string(),
  phone: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  address: userAddressSchema,
  roles: z.array(userRoleSchema),
});

export const userCreateSchema = userWriteBaseSchema.omit({ password: true });
export type UserCreate = z.infer<typeof userCreateSchema>;

export const userUpdateSchema = userWriteBaseSchema
  .partial()
  .superRefine((data, ctx) => {
    const keys = Object.keys(data);
    if (keys.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "At least one field is required",
        path: [],
      });
    }

    if (data.roles) {
      if (data.roles.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "At least one role is required",
          path: ["roles"],
        });
      }
    }
  });
export type UserUpdate = z.infer<typeof userUpdateSchema>;

export const userDetailSchema = userWriteBaseSchema.extend({
  id: z.string(),
});
export type UserDetail = z.infer<typeof userDetailSchema>;

export const userListSchema = userWriteBaseSchema.omit({
  password: true,
  roles: true,
  address: true,
});
export type UserList = z.infer<typeof userListSchema>;

export const adminCreateUserSchema = z.object({
  email: z.email(),
});
export type AdminCreateUser = z.infer<typeof adminCreateUserSchema>;
