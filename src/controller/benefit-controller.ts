import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreateBenefitRequest } from "../model/benefit-model";
import { BenefitService } from "../services/benefit-service";

export class BenefitController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateBenefitRequest = req.body as CreateBenefitRequest;
      const facilityId = req.body.facilityId;
      const ownerId = req.user!.id;

      if (!ownerId) {
        res.status(401).json({
          message: "Unauthorized",
        });
        return;
      }

      const response = await BenefitService.create(
        request,
        facilityId,
        ownerId
      );
      res.status(201).json({
        message: "Benefit created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const facilityId = req.params.facilityId;
      const benefits = await BenefitService.get(facilityId);

      res.status(200).json({
        message: "Benefits retrieved successfully",
        data: benefits,
      });
    } catch (error) {
      next(error);
    }
  }
}
