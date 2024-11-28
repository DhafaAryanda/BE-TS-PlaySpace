import { Benefit } from "@prisma/client";

export type BenefitResponse = {
  id: string;
  facility_id: string;
  name: string;
  description: string;
};

export type CraeteBenefitRequest = {
  facility_id: string;
  name: string;
  description: string;
};

export function toBenefitResponse(benefit: Benefit): BenefitResponse {
  return {
    id: benefit.id,
    facility_id: benefit.facility_id,
    name: benefit.name,
    description: benefit.description,
  };
}
