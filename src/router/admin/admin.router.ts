import { List, GetById } from "../../handler/user.handler";
import { Router } from "express";
import { z } from "zod";
import { validateData } from "../../utils/validation";
import { GiveAdmin, DeleteUser } from "../../handler/admin.handler";

const router: Router = Router();

const userByIdSchema = z.object({
  id: z.number(),
});

router.get("/list", List);
router.post("/get_by_id", validateData(userByIdSchema), GetById);
router.post("/delete", validateData(userByIdSchema), DeleteUser);
router.post("/give_admin", validateData(userByIdSchema), GiveAdmin);

export default router;
