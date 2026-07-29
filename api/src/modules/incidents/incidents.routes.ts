import { Router } from "express";

import { IncidentController } from "./incidents.controller";

import { incidentService } from "./incidents.container";

const router = Router();

const controller = new IncidentController(incidentService);

router.get("/", controller.getAll);

router.get("/:id", controller.getOne);

router.post("/", controller.create);

router.patch("/:id", controller.update);

router.delete("/:id", controller.delete);

export default router;
