import { List, GetById, DeleteUser } from "../../handler/user.handler";
import { Router } from "express";
import { z } from "zod";
import { validateData } from "../../utils/validation";

const router: Router = Router();

const userByIdSchema = z.object({
  id: z.number(),
});

router.get("/list", List);
router.post("/get_by_id", validateData(userByIdSchema), GetById);
router.post("/delete", validateData(userByIdSchema), DeleteUser);

export default router;
