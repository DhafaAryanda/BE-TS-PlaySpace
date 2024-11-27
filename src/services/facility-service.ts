import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import {
  CreateFacilityRequest,
  FacilityResponse,
  toFacilityResponse,
  UpdateFacilityRequest,
} from "../model/facility-model";
import { FacilityValidation } from "../validation/facility-validation";
import { Validation } from "../validation/validation";

export class FacilityService {
  static async create(
    request: CreateFacilityRequest,
    ownerId: string
  ): Promise<FacilityResponse> {
    const createRequest = Validation.validate(
      FacilityValidation.CREATE,
      request
    );

    const facility = await prismaClient.facility.create({
      data: {
        ...createRequest,
        owner_id: ownerId,
      },
    });

    return toFacilityResponse(facility);
  }

  static async update(
    facilityId: string,
    request: UpdateFacilityRequest
  ): Promise<FacilityResponse> {
    const updateRequest = Validation.validate(
      FacilityValidation.UPDATE,
      request
    );

    const facility = await prismaClient.facility.findUnique({
      where: {
        id: facilityId,
      },
    });

    if (!facility) {
      throw new ResponseError(404, "Facility not found");
    }

    const updatedData: UpdateFacilityRequest = {};

    if (updateRequest.name) {
      updatedData.name = updateRequest.name;
    }
    if (updateRequest.category_id) {
      updatedData.category_id = updateRequest.category_id;
    }
    if (updateRequest.description) {
      updatedData.description = updateRequest.description;
    }
    if (updateRequest.price_per_hour) {
      updatedData.price_per_hour = updateRequest.price_per_hour;
    }

    const result = await prismaClient.facility.update({
      where: {
        id: facility.id,
      },
      data: updatedData,
    });

    return toFacilityResponse(result);
  }

  static async get(facilityId: string): Promise<FacilityResponse> {
    const facility = await prismaClient.facility.findUnique({
      where: {
        id: facilityId,
      },
      include: {
        owner: true,
      },
    });

    if (!facility) {
      throw new ResponseError(404, "Facility not found");
    }

    return {
      ...toFacilityResponse(facility),
      owner_avatar: facility.owner.avatar,
    };
  }

  static async getAll(): Promise<FacilityResponse[]> {
    const facilities = await prismaClient.facility.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        owner: true,
      },
    });

    return facilities.map((facility) => {
      return {
        ...toFacilityResponse(facility),
        owner_avatar: facility.owner.avatar,
      };
    });
  }
}
