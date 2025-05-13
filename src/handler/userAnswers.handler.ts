import { Request, Response } from "express";
import { prisma } from "../utils/database";
import { io } from "../utils/socket";
import { dateDifference } from "../utils/fuctions";

export const Create = async (req: Request, res: Response) => {
  try {
    const { LessonTestID } = req.body;
    let userTest = await prisma.userTest.create({
      data: {
        LessonTestID,
        createdBy: parseInt(req.headers.userId as string),
      },
    });
    res.status(200).json({
      status: true,
      message: "success",
      data: userTest,
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
    const userTest = await prisma.userTest.findMany({
      skip: filter.skip,
      take: filter.take,
      orderBy: { createdAt: filter.order },
      include: { UserAnswers: true },
    });
    res.status(200).json({ status: true, message: "success", data: userTest });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};

export const Delete = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await prisma.userTest.delete({ where: { id } });
    res.status(200).json({ status: true, message: "success" });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};

export const AnswerCreate = async (req: Request, res: Response) => {
  try {
    const { UserTestID, QuestionsID, AnswerId } = req.body;
    let userTest = await prisma.userTest.findFirst({
      where: { id: UserTestID },
    });
    if (userTest?.endedAt) {
      res.status(400).json({ status: false, message: "Test is over" });
      return;
    }
    let userAnswers = await prisma.userAnswers.create({
      data: {
        UserTestID,
        QuestionsID,
        AnswerId,
        createdBy: parseInt(req.headers.userId as string),
      },
    });
    res.status(200).json({
      status: true,
      message: "success",
      data: userAnswers,
    });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};

export const StartTest = async (req: Request, res: Response) => {
  try {
    const { id, is_ending } = req.body;
    if (is_ending) {
      await prisma.userTest.update({
        where: {
          id,
        },
        data: {
          endedAt: new Date(),
        },
      });
      res.status(200).json({ status: true, message: "success" });
      return;
    }
    let endDate = new Date();
    await prisma.userTest.update({
      where: {
        id,
      },
      data: {
        startAt: endDate,
      },
    });
    endDate.setMinutes(endDate.getMinutes() + 15);
    let intervalId = setInterval(async function () {
      let dateNow = new Date();
      let difference = dateDifference(endDate, dateNow);
      io.to(id).emit("time", difference.minutes, difference.seconds);
      if (dateNow > endDate) {
        clearInterval(intervalId);
        await prisma.userTest.update({
          where: {
            id,
          },
          data: {
            endedAt: dateNow,
          },
        });
      }
    }, 30000);
    res.status(200).json({ status: true, message: "success" });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};

export const GetResult = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    let result = await prisma.userTest.findFirst({
      where: { id },
      include: {
        UserAnswers: true,
      },
    });
    res.status(200).json({ status: true, message: "success", data: result });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};
