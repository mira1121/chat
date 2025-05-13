import {
  Create,
  List,
  Delete,
  AnswerCreate,
  StartTest,
} from "../../handler/userAnswers.handler";
import { Router } from "express";
import { z } from "zod";
import { filterSchema, idSchema, validateData } from "../../utils/validation";

const router: Router = Router();

const userTestSchema = z.object({
  LessonTestID: z.number(),
});

const userAnswerSchema = z.object({
  UserTestID: z.number(),
  QuestionsID: z.number(),
  AnswerId: z.number(),
});

router.post("/list", validateData(filterSchema), List);
router.post("/create", validateData(userTestSchema), Create);
router.post("/delete", validateData(idSchema), Delete);
router.post("/answer-create", validateData(userAnswerSchema), AnswerCreate);
router.post("/start", validateData(idSchema), StartTest);

export default router;
