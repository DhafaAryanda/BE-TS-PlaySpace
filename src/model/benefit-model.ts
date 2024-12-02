import { Benefit } from "@prisma/client";

export type BenefitResponse = {
  id: string;
  facilityId: string;
  name: string;
  description: string;
};

export type CreateBenefitRequest = {
  facilityId: string;
  name: string;
  description: string;
};

export function toBenefitResponse(benefit: Benefit): BenefitResponse {
  return {
    id: benefit.id,
    facilityId: benefit.facilityId,
    name: benefit.name,
    description: benefit.description,
  };
}
