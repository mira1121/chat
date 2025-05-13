import { Create, List, Delete, Update } from "../../handler/lesson.handler";
import { Router } from "express";
import { z } from "zod";
import { filterSchema, idSchema, validateData } from "../../utils/validation";

const router: Router = Router();

const lessonSchema = z.object({
  name: z.string(),
  desc: z.string(),
  picture: z.string(),
});

const lessonUpdateSchema = z.object({
  id: z.number(),
  name: z.string(),
  desc: z.string(),
  picture: z.string(),
});

router.post("/list", validateData(filterSchema), List);
router.post("/create", validateData(lessonSchema), Create);
router.post("/delete", validateData(idSchema), Delete);
router.post("/Update", validateData(lessonUpdateSchema), Update);

export default router;
