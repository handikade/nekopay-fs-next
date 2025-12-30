import { PartnerModel } from './model';
import type { PartnerDocument } from './schema';
import type { CreatePartnerDto, UpdatePartnerDto } from './dto';

export async function create(
  payload: CreatePartnerDto
): Promise<PartnerDocument> {
  return await PartnerModel.create(payload);
}

export async function findById(id: string): Promise<PartnerDocument | null> {
  return await PartnerModel.findById(id).exec();
}

export async function findAll(): Promise<PartnerDocument[]> {
  return await PartnerModel.find().exec();
}

export async function update(
  id: string,
  payload: UpdatePartnerDto
): Promise<PartnerDocument | null> {
  return await PartnerModel.findByIdAndUpdate(id, payload, { new: true }).exec();
}

export async function deleteById(id: string): Promise<PartnerDocument | null> {
  return await PartnerModel.findByIdAndDelete(id).exec();
}
