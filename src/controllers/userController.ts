import { Request, Response } from "express";
import { User } from "../entities/User";
import { AppDataSource } from "../database/data-source";
import bcrypt from "bcryptjs";

const usersRepository = AppDataSource.getRepository(User);

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await usersRepository.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: "Internal Sever Error" });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  try {
    const user = await usersRepository.findOneBy({ id });
    if (!user) {
      return res.status(404).json({ messsage: "User not found." });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData = req.body;
  const existingUser = await usersRepository.findOneBy({ email: userData.email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use." });
  }
  const hashedPassword = await bcrypt.hash(userData.password, 17);
  userData.password = hashedPassword;
  try {
    const newUser =  usersRepository.create(userData);
    const savedUser = await usersRepository.save(newUser);
    return res.status(201).json({savedUser,message:"User created successfully."});
  } catch (err) {
    return res.status(500).json({ message: `Internal server error: ${err}` });
  }
};

export const updateUSer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const userData = req.body;
  try {
    const user = await usersRepository.findOneBy({ id });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    usersRepository.merge(user, userData);
    const updatedUser = await usersRepository.save(user);
    return res.status(200).json({updatedUser, message: "User updated successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  try {
    const user = await usersRepository.findOneBy({ id });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    await usersRepository.remove(user);
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: "Internal Sever Error" });
  }
};
