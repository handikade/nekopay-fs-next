import { z } from "zod";

const bankInputSchema = z.object({
  code: z.string().trim().min(1, "Bank code cannot be empty."),
  name: z.string().trim().min(1, "Bank name cannot be empty."),
});

export const createBankDto = bankInputSchema;
export type CreateBankDto = z.infer<typeof createBankDto>;

export const updateBankDto = bankInputSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });
export type UpdateBankDto = z.infer<typeof updateBankDto>;

// Base schema for bank data returned from API
const bankBase = z.object({
  id: z.string(), // Mongoose _id will be converted to string
  code: z.string(),
  name: z.string(),
});

export const listBankDto = bankBase;
export type ListBankDto = z.infer<typeof listBankDto>;

export const detailBankDto = bankBase;
export type DetailBankDto = z.infer<typeof detailBankDto>;

export const findBanksQueryDto = z.object({
  code: z.string().optional(),
  name: z.string().optional(),
});
export type FindBanksQueryDto = z.infer<typeof findBanksQueryDto>;
