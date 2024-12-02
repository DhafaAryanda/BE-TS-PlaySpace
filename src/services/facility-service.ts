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
    // Validasi input menggunakan aturan yang telah ditentukan
    const validatedRequest = Validation.validate(
      FacilityValidation.CREATE,
      request
    );

    // Memeriksa apakah kategori yang dimaksud ada di database
    const categoryExists = await prismaClient.category.findUnique({
      where: { id: validatedRequest.categoryId },
    });

    if (!categoryExists) {
      throw new Error(
        `Category with id ${validatedRequest.categoryId} does not exist`
      );
    }

    // Membuat fasilitas baru di database
    const facility = await prismaClient.facility.create({
      data: {
        ...validatedRequest,
        ownerId,
      },
    });

    // Mengembalikan respons fasilitas yang telah dibuat
    return {
      id: facility.id,
      name: facility.name,
      categoryId: facility.categoryId,
      description: facility.description,
      pricePerHour: parseFloat(facility.pricePerHour.toFixed(2)),
      thumbnail: facility.thumbnail,
      owner: {
        id: facility.ownerId,
        name: facility.ownerId,
        avatar: facility.ownerId || null,
      },
      category: {
        id: facility.categoryId,
        name: facility.categoryId,
      },
    };
  }

  // static async update(
  //   facilityId: string,
  //   ownerId: string,
  //   request: UpdateFacilityRequest
  // ): Promise<FacilityResponse> {
  //   const updateRequest = Validation.validate(
  //     FacilityValidation.UPDATE,
  //     request
  //   );

  //   const facility = await prismaClient.facility.findUnique({
  //     where: {
  //       id: facilityId,
  //     },
  //   });

  //   const isOwner = facility?.ownerId === ownerId;

  //   if (!isOwner) {
  //     throw new ResponseError(
  //       403,
  //       "Forbidden: You are not the owner of this facility"
  //     );
  //   }

  //   if (!facility) {
  //     throw new ResponseError(404, "Facility not found");
  //   }

  //   const updatedData: UpdateFacilityRequest = {};

  //   if (updateRequest.name) {
  //     updatedData.name = updateRequest.name;
  //   }
  //   if (updateRequest.categoryId) {
  //     updatedData.categoryId = updateRequest.categoryId;
  //   }
  //   if (updateRequest.description) {
  //     updatedData.description = updateRequest.description;
  //   }
  //   if (updateRequest.pricePerHour) {
  //     updatedData.pricePerHour = updateRequest.pricePerHour;
  //   }

  //   const result = await prismaClient.facility.update({
  //     where: {
  //       id: facility.id,
  //     },
  //     data: updatedData,
  //   });

  //   return toFacilityResponse(result);
  // }

  static async get(facilityId: string): Promise<FacilityResponse> {
    const facility = await prismaClient.facility.findUnique({
      where: {
        id: facilityId,
      },
      include: {
        owner: true,
        category: true,
      },
    });

    if (!facility) {
      throw new ResponseError(404, "Facility not found");
    }

    return {
      ...toFacilityResponse(facility),
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

  static async getAll(): Promise<FacilityResponse[]> {
    const facilities = await prismaClient.facility.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        owner: true,
        category: true,
      },
    });

    return facilities.map((facility) => {
      return {
        ...toFacilityResponse(facility),
        ownerAvatar: facility.owner.avatar,
        category: {
          id: facility.category.id,
          name: facility.category.name,
        },
      };
    });
  }
}
