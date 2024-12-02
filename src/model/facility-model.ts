import { Facility } from "@prisma/client";

export type FacilityResponse = {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  thumbnail: string;
  pricePerHour: number;
  owner: {
    id: string;
    name: string;
    avatar: string | null;
  };
  category: {
    id: string;
    name: string;
  };
};

export type CreateFacilityRequest = {
  name: string;
  categoryId: string;
  description: string;
  pricePerHour: number;
  thumbnail: string;
  ownerId: string;
};

export type UpdateFacilityRequest = {
  name?: string;
  categoryId?: string;
  description?: string;
  pricePerHour?: number;
};

export function toFacilityResponse(facility: any): FacilityResponse {
  return {
    id: facility.id,
    name: facility.name,
    categoryId: facility.categoryId,
    description: facility.description,
    pricePerHour: parseFloat(facility.pricePerHour.toFixed(2)),
    thumbnail: facility.thumbnail,
    owner: {
      id: facility.owner.id,
      name: facility.owner.name,
      avatar: facility.owner.avatar || null,
    },
    category: {
      id: facility.category.id,
      name: facility.category.name,
    },
  };
}
