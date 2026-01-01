import { MongoServerError } from "mongodb";
import type { QueryFilter, SortOrder } from "mongoose";
import type { CreatePartnerDto, UpdatePartnerDto } from "./dto";
import { PartnerModel } from "./model";
import type { PartnerDocument } from "./schema";

interface SchemaValidationRule {
  missingProperties?: string[];
  propertiesNotSatisfied?: Array<{ propertyName: string }>;
}

export type SearchQuery = {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
  email?: string;
  partner_number?: string;
};

export async function create(
  payload: CreatePartnerDto
): Promise<PartnerDocument> {
  console.log(payload);
  try {
    return await PartnerModel.create(payload);
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 121) {
      const details = error.errInfo?.details;
      const rules = details?.schemaRulesNotSatisfied ?? [];

      const missing = rules.flatMap((rule: SchemaValidationRule) => rule.missingProperties ?? []);
      const invalid = rules.flatMap((rule: SchemaValidationRule) =>
        (rule.propertiesNotSatisfied ?? []).map((p: { propertyName: string }) => p.propertyName)
      );

      console.error("Mongo validation failed", { missing, invalid, rules });
    }

    throw error;
  }
}

export async function findById(id: string): Promise<PartnerDocument | null> {
  return await PartnerModel.findById(id).exec();
}

export async function findAll(query: SearchQuery): Promise<{
  partners: PartnerDocument[];
  meta: {
    current_page: number;
    items_per_page: number;
    total_records: number;
    total_pages: number;
  };
}> {
  const { email, limit, page, partner_number, sortBy, sortOrder } = query;

  const filters: QueryFilter<PartnerDocument> = {};

  if (email) filters.email = { $regex: email, $options: "i" };
  if (partner_number)
    filters.partner_number = { $regex: partner_number, $options: "i" };

  const skip = (page - 1) * limit;
  const sort: Record<string, SortOrder> = {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
  };

  const partners = await PartnerModel.find(filters)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .exec();

  const total = await PartnerModel.countDocuments(filters);

  return {
    partners,
    meta: {
      current_page: page,
      items_per_page: limit,
      total_records: total,
      total_pages: Math.ceil(total / limit),
    },
  };
}

export async function update(
  id: string,
  payload: UpdatePartnerDto
): Promise<PartnerDocument | null> {
  return await PartnerModel.findByIdAndUpdate(id, payload, {
    new: true,
  }).exec();
}

export async function deleteById(id: string): Promise<PartnerDocument | null> {
  return await PartnerModel.findByIdAndDelete(id).exec();
}
