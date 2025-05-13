import { Request, Response } from "express";
import { prisma } from "../utils/database";

export const Create = async (req: Request, res: Response) => {
  try {
    const { question, LessonTestID, question_type, medias } = req.body;
    let Questions = await prisma.questions.create({
      data: {
        question,
        LessonTestID,
        question_type,
        createdBy: parseInt(req.headers.userId as string),
      },
    });
    medias.forEach(async (element: any) => {
      await prisma.questionsMedia.create({
        data: {
          media: element,
          QuestionsID: Questions.id,
        },
      });
    });
    res.status(200).json({
      status: true,
      message: "success",
      data: Questions,
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
    const Questionss = await prisma.questions.findMany({
      skip: filter.skip,
      take: filter.take,
      orderBy: { createdAt: filter.order },
      include: {
        QuestionsMedia: true,
      },
    });
    res
      .status(200)
      .json({ status: true, message: "success", data: Questionss });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};

export const Update = async (req: Request, res: Response) => {
  try {
    const { id, question, question_type, medias } = req.body;
    let Questions = await prisma.questions.update({
      where: { id },
      data: {
        question,
        question_type,
      },
    });
    if (medias) {
      await prisma.questionsMedia.deleteMany({
        where: {
          QuestionsID: Questions.id,
        },
      });
      medias.forEach(async (element: any) => {
        await prisma.questionsMedia.create({
          data: {
            media: element,
            QuestionsID: Questions.id,
          },
        });
      });
    }
    res.status(200).json({ status: true, message: "success", data: Questions });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};

export const Delete = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await prisma.questions.delete({ where: { id } });
    await prisma.questionsMedia.deleteMany({
      where: {
        QuestionsID: id,
      },
    });
    res.status(200).json({ status: true, message: "success" });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};
