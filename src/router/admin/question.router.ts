import { Create, List, Delete, Update } from "../../handler/question.handler";
import { Router } from "express";
import { z } from "zod";
import { filterSchema, idSchema, validateData } from "../../utils/validation";

const router: Router = Router();

const QuestionSchema = z.object({
  question: z.string(),
  LessonTestID: z.number(),
  question_type: z.string(),
});

const QuestionUpdateSchema = z.object({
  id: z.number(),
  question: z.string(),
  question_type: z.string(),
});

router.post("/list", validateData(filterSchema), List);
router.post("/create", validateData(QuestionSchema), Create);
router.post("/delete", validateData(idSchema), Delete);
router.post("/Update", validateData(QuestionUpdateSchema), Update);

export default router;
