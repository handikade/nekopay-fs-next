import { isValidObjectId } from "mongoose";
import { z } from "zod";

const baseSchema = z.object({
  bankId: z
    .string()
    .refine((val) => isValidObjectId(val), { message: "Invalid Bank ID" }),
  accountName: z.string(),
  accountNumber: z.string(),
});

export const createPartnerBankAccountDto = baseSchema.extend({
  userId: z.string(),
  partnerId: z.string(),
});

export const updatePartnerBankAccountDto = baseSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one field must be provided for update"
  );

export type CreatePartnerBankAccountDto = z.infer<
  typeof createPartnerBankAccountDto
>;
export type UpdatePartnerBankAccountDto = z.infer<
  typeof updatePartnerBankAccountDto
>;
