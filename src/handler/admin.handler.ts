import { Request, Response } from "express";
import { prisma } from "../utils/database";

export const GiveAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    let user = await prisma.user.findFirst({
      where: { id, is_active: true },
    });
    if (!user) {
      res
        .status(400)
        .json({ status: false, message: "Error", data: "data has not found" });
    }
    user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        is_admin: true,
      },
    });
    res.status(200).json({
      status: true,
      message: "success",
      data: { user: user },
    });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};

export const DeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    let user = await prisma.user.findFirst({
      where: { id, is_active: true },
    });
    if (!user) {
      res
        .status(400)
        .json({ status: false, message: "Error", data: "data has not found" });
    }
    user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        is_active: false,
      },
    });
    res.status(200).json({
      status: true,
      message: "success",
      data: { user: user },
    });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};
