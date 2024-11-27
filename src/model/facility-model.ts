import { Facility, FacilityCategory, User } from "@prisma/client";

export type FacilityResponse = {
  id: string;
  name: string;
  category: FacilityCategory;
  description: string;
  thumbnail: string;
  price_per_hour: number;
  owner_id: string;
  owner_avatar?: string;
  created_at: string;
  updated_at: string;
};

export type CreateFacilityRequest = {
  name: string;
  category: FacilityCategory;
  description: string;
  price_per_hour: number;
  thumbnail: string;
  owner_id: string;
};

export type UpdateFacilityRequest = {
  name?: string;
  category?: FacilityCategory;
  description?: string;
  price_per_hour?: number;
};

export function toFacilityResponse(facility: Facility): FacilityResponse {
  return {
    id: facility.id,
    name: facility.name,
    category: facility.category,
    description: facility.description,
    price_per_hour: parseFloat(facility.price_per_hour.toFixed(2)),
    thumbnail: facility.thumbnail,
    owner_id: facility.owner_id,
    created_at: facility.created_at.toISOString(),
    updated_at: facility.updated_at.toISOString(),
  };
}
