import {
  Create,
  List,
  Delete,
  Update,
} from "../../handler/lesson-test.handler";
import { Router } from "express";
import { z } from "zod";
import { filterSchema, idSchema, validateData } from "../../utils/validation";

const router: Router = Router();

const lessonTestSchema = z.object({
  name: z.string(),
  desc: z.string(),
  LessonID: z.number(),
});

const lessonTestUpdateSchema = z.object({
  id: z.number(),
  name: z.string(),
  desc: z.string(),
});

router.post("/list", validateData(filterSchema), List);
router.post("/create", validateData(lessonTestSchema), Create);
router.post("/delete", validateData(idSchema), Delete);
router.post("/Update", validateData(lessonTestUpdateSchema), Update);

export default router;
