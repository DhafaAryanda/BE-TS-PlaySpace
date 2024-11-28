import { Facility } from "@prisma/client";

export type FacilityResponse = {
  id: string;
  name: string;
  category_id: string;
  description: string;
  thumbnail: string;
  price_per_hour: number;
  owner: {
    id: string;
    name: string;
    avatar: string;
  };
  category: {
    id: string;
    name: string;
  };
};

export type CreateFacilityRequest = {
  name: string;
  category_id: string;
  description: string;
  price_per_hour: number;
  thumbnail: string;
  owner_id: string;
};

export type UpdateFacilityRequest = {
  name?: string;
  category_id?: string;
  description?: string;
  price_per_hour?: number;
};

export function toFacilityResponse(facility: any): FacilityResponse {
  return {
    id: facility.id,
    name: facility.name,
    category_id: facility.category_id,
    description: facility.description,
    price_per_hour: parseFloat(facility.price_per_hour.toFixed(2)),
    thumbnail: facility.thumbnail,
    owner: {
      id: facility.owner.id,
      name: facility.owner.name,
      avatar: facility.owner.avatar,
    },
    category: {
      id: facility.category.id,
      name: facility.category.name,
    },
  };
}
