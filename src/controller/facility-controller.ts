import { NextFunction, Request, Response } from "express";
import {
  CreateFacilityRequest,
  UpdateFacilityRequest,
} from "../model/facility-model";
import { FacilityService } from "../services/facility-service";
import { UserRequest } from "../type/user-request";
import { prismaClient } from "../app/database";

export class FacilityController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateFacilityRequest = req.body;
      const ownerId = req.user!.id; // Mengambil owner ID dari token

      const user = await prismaClient.user.findUnique({
        where: {
          id: ownerId,
        },
      });

      if (!user) {
        res.status(401).json({
          message: "Unauthorized",
        });
        return;
      }

      if (user.role !== "OWNER") {
        res.status(403).json({
          message: "Forbidden: You are not an owner",
        });
        return;
      }

      const response = await FacilityService.create(request, ownerId);

      res.status(201).json({
        message: "Facility created successfully",
        data: response,
      });
    } catch (error) {
      next(error); // Menangani error
    }
  }

  // static async update(req: UserRequest, res: Response, next: NextFunction) {
  //   try {
  //     const request: UpdateFacilityRequest = req.body as UpdateFacilityRequest;
  //     const facilityId = req.params.facilityId;
  //     const ownerId = req.user!.id;
  //     if (!ownerId) {
  //       res.status(401).json({
  //         message: "Unauthorized",
  //       });
  //       return;
  //     }

  //     const facility = await prismaClient.facility.findUnique({
  //       where: {
  //         id: facilityId,
  //       },
  //     });

  //     if (!facility) {
  //       res.status(404).json({
  //         message: "Facility not found",
  //       });
  //       return;
  //     }

  //     if (facility.ownerId !== ownerId) {
  //       res.status(403).json({
  //         message: "Forbidden: You are not the owner of this facility",
  //       });
  //       return;
  //     }

  //     const response = await FacilityService.update(
  //       facilityId,
  //       ownerId,
  //       request
  //     );
  //     res.status(200).json({
  //       message: "Facility updated successfully",
  //       data: response,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const facilityId = req.params.facilityId;
      const response = await FacilityService.get(facilityId);
      res.status(200).json({
        message: "Facility retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await FacilityService.getAll();
      res.status(200).json({
        message: "Facilities retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
