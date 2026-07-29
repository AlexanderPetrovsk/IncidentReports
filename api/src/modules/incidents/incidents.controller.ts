import { Request, Response } from "express";

import {
  createIncidentSchema,
  updateIncidentSchema,
} from "./incidents.validator";

import { IncidentService } from "./incidents.service";

export class IncidentController {
  constructor(private service: IncidentService) {}

  getAll = async (req: Request, res: Response) => {
    const result = await this.service.findAll(req.query);

    res.json(result);
  };

  getOne = async (req: Request, res: Response) => {
    const result = await this.service.findById(req.params.id as string);

    res.json(result);
  };

  create = async (req: Request, res: Response) => {
    const data = createIncidentSchema.parse(req.body);

    const result = await this.service.create(data);

    res.status(201).json(result);
  };

  update = async (req: Request, res: Response) => {
    const data = updateIncidentSchema.parse(req.body);

    const result = await this.service.update(req.params.id as string, data);

    res.json(result);
  };

  delete = async (req: Request, res: Response) => {
    const result = await this.service.delete(req.params.id as string);

    res.json(result);
  };
}
