import { Request, Response } from "express";
import { prisma } from "../utils/database";

export const Create = async (req: Request, res: Response) => {
  try {
    const { name, desc, LessonID } = req.body;
    let lessonTest = await prisma.lessonTest.create({
      data: {
        name,
        desc,
        LessonID,
        createdBy: parseInt(req.headers.userId as string),
      },
    });
    res.status(200).json({
      status: true,
      message: "success",
      data: lessonTest,
    });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};

export const List = async (req: Request, res: Response) => {
  try {
    const { filter } = req.body;
    const lessonTests = await prisma.lessonTest.findMany({
      skip: filter.skip,
      take: filter.take,
      orderBy: { createdAt: filter.order },
      include: {
        Questions: true,
      },
    });
    res
      .status(200)
      .json({ status: true, message: "success", data: lessonTests });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};

export const Update = async (req: Request, res: Response) => {
  try {
    const { id, name, desc } = req.body;
    let lessonTest = await prisma.lessonTest.update({
      where: { id },
      data: {
        name,
        desc,
      },
    });
    res
      .status(200)
      .json({ status: true, message: "success", data: lessonTest });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};

export const Delete = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await prisma.lessonTest.delete({ where: { id } });
    res.status(200).json({ status: true, message: "success" });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};
