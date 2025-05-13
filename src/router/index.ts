import { Router } from "express";
import UserRoute from "./user/user.router";
import AdminRoute from "./admin/admin.router";
import LessonRoute from "./admin/lesson.router";
import QuestionRoute from "./admin/question.router";
import LessonTestRoute from "./admin/lesson-test.router";
import answerRoute from "./admin/answer.router";
import userAnswerRoute from "./user/userAnswers.router";

import { authenticateToken, authenticateAdminToken } from "../utils/token";
import { Login, Create } from "../handler/user.handler";
import {
  idSchema,
  userLoginSchema,
  userRegSchema,
  validateData,
} from "../utils/validation";
import { GetResult } from "../handler/userAnswers.handler";

const router: Router = Router();
// public route
router.post("/result", validateData(idSchema), GetResult);

// login route
router.post("/create_user", validateData(userRegSchema), Create);
router.post("/login", validateData(userLoginSchema), Login);

// user route
router.use("/user", authenticateToken, UserRoute);
router.use("/user_answer", authenticateToken, userAnswerRoute);

// admin route
router.use("/admin", authenticateAdminToken, AdminRoute);
router.use("/lesson", authenticateAdminToken, LessonRoute);
router.use("/lesson_test", authenticateAdminToken, LessonTestRoute);
router.use("/question", authenticateAdminToken, QuestionRoute);
router.use("/answer", authenticateAdminToken, answerRoute);

export default router;
