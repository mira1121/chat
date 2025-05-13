import { Request, Response } from "express";
import { prisma } from "../utils/database";

export const Create = async (req: Request, res: Response) => {
  try {
    const { is_correct, answer, QuestionsID } = req.body;
    let answers = await prisma.answers.create({
      data: {
        answer,
        is_correct,
        QuestionsID,
        createdBy: parseInt(req.headers.userId as string),
      },
    });
    res.status(200).json({
      status: true,
      message: "success",
      data: answers,
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
    const answerss = await prisma.answers.findMany({
      skip: filter.skip,
      take: filter.take,
      orderBy: { createdAt: filter.order },
      include: {
        Questions: true,
      },
    });
    res.status(200).json({ status: true, message: "success", data: answerss });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};

export const Update = async (req: Request, res: Response) => {
  try {
    const { id, is_correct, answer } = req.body;
    let answers = await prisma.answers.update({
      where: { id },
      data: {
        is_correct,
        answer,
      },
    });
    res.status(200).json({ status: true, message: "success", data: answers });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};

export const Delete = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await prisma.answers.delete({ where: { id } });
    res.status(200).json({ status: true, message: "success" });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};
