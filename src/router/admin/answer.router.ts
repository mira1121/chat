import { Create, List, Delete, Update } from "../../handler/answer.handler";
import { Router } from "express";
import { z } from "zod";
import { filterSchema, idSchema, validateData } from "../../utils/validation";

const router: Router = Router();

const answerSchema = z.object({
  is_correct: z.boolean(),
  answer: z.string(),
  QuestionsID: z.number(),
});

const answerUpdateSchema = z.object({
  id: z.number(),
  is_correct: z.boolean(),
  answer: z.string(),
});

router.post("/list", validateData(filterSchema), List);
router.post("/create", validateData(answerSchema), Create);
router.post("/delete", validateData(idSchema), Delete);
router.post("/Update", validateData(answerUpdateSchema), Update);

export default router;
