import { Request, Response } from "express";
import { prisma } from "../utils/database";

export const Create = async (req: Request, res: Response) => {
  try {
    const { name, desc, picture } = req.body;
    let lesson = await prisma.lesson.create({
      data: {
        name,
        desc,
        picture,
        createdBy: parseInt(req.headers.userId as string),
      },
    });
    res.status(200).json({
      status: true,
      message: "success",
      data: lesson,
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
    const lessons = await prisma.lesson.findMany({
      skip: filter.skip,
      take: filter.take,
      orderBy: { createdAt: filter.order },
      include: {
        LessonTest: true,
      },
    });
    res.status(200).json({ status: true, message: "success", data: lessons });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};

export const Update = async (req: Request, res: Response) => {
  try {
    const { id, name, desc, picture } = req.body;
    let lesson = await prisma.lesson.update({
      where: { id },
      data: {
        name,
        desc,
        picture,
      },
    });
    res.status(200).json({ status: true, message: "success", data: lesson });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};

export const Delete = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await prisma.lesson.delete({ where: { id } });
    res.status(200).json({ status: true, message: "success" });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};
