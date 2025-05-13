import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res.status(400).json({
          status: false,
          message: "Invalid data",
          details: errorMessages,
        });
      } else {
        res
          .status(501)
          .json({ status: false, message: "Internal Server Error" });
      }
    }
  };
}

export const userRegSchema = z.object({
  last_name: z.string().max(25),
  first_name: z.string().max(25),
  phone_number: z.string().min(8).max(12),
  email: z.string().email(),
  password: z.string().min(3),
});

export const userLoginSchema = z.object({
  username: z.string(),
  password: z.string().min(3),
});

export const idSchema = z.object({
  id: z.number(),
});

export const filterSchema = z.object({
  filter: z.object({
    skip: z.number(),
    take: z.number(),
    order: z.string(),
  }),
});
