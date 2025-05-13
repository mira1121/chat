import { Request, Response } from "express";
import { prisma } from "../utils/database";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export const Login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    let user = await prisma.user.findFirst({
      where: {
        is_active: true,
        OR: [
          {
            email: username,
          },
          {
            phone_number: username,
          },
        ],
      },
      select: {
        email: true,
        password: true,
        id: true,
        is_admin: true,
      },
    });
    if (!user) {
      res.status(400).json({ status: false, message: "user not found" });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ status: false, message: "Authentication failed" });
      return;
    }
    const token = jwt.sign(
      { userId: user.id, isAdmin: user.is_admin },
      process.env.TOKEN_SECRET!,
      {
        expiresIn: "24h",
      }
    );
    const keyToRemove: keyof User = "password";
    const { [keyToRemove]: removedKey, ...newUser } = user;
    res.status(200).json({
      status: true,
      message: "success",
      data: { user: newUser, token: token },
    });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};

export const Create = async (req: Request, res: Response) => {
  try {
    const { last_name, first_name, phone_number, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await prisma.user.findFirst({
      where: {
        is_active: true,
        OR: [
          {
            email: email,
          },
          {
            phone_number: phone_number,
          },
        ],
      },
    });
    if (user) {
      res.status(400).json({
        status: false,
        message: "email or phone number already registered",
      });
      return;
    }
    user = await prisma.user.create({
      data: {
        email,
        phone_number,
        first_name,
        last_name,
        password: hashedPassword,
        is_admin: false,
        is_active: true,
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

export const List = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        is_active: true,
      },
      orderBy: { first_name: "asc" },
    });
    res.status(200).json({
      status: true,
      message: "success",
      data: { user: users },
    });
    return;
  } catch (error) {
    res.status(400).json({ status: false, message: "Error", data: error });
    return;
  }
};

export const GetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const user = await prisma.user.findFirst({
      where: { id, is_active: true },
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
    if (req.headers.userId != id) {
      res.status(400).json({
        status: false,
        message: "Error",
        data: "user can't delete others",
      });
    }
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
