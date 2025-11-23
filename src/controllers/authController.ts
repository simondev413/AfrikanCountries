import { Request, Response } from "express";
import { User } from "../entities/User";
import { AppDataSource } from "../database/data-source";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { isBcryptHash } from "../utils/helpers";

import dotenv from "dotenv"

dotenv.config()


const usersRepository = AppDataSource.getRepository(User);

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const user = await usersRepository.findOneBy({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!isBcryptHash(user.password)) {
      const hashedPassword = await bcrypt.hash(user.password, 17);
      user.password = hashedPassword;
      await usersRepository.save(user);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = sign(
      {
        id: user.id,
        email: user.email,
        role: user.role, // 👈 Manda a role aqui
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1D"}
    );

    user.lastLogin = new Date();
    await usersRepository.save(user);

    return res.status(200).json({
      message: "Login successful.",
      token,
      role: user.role, // opcional retornar
    });
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
    });
  }
}
