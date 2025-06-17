import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../prisma";
import { AuthRequest } from "../middlewares/authMiddleware";

export const createUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { firstName, lastName, email, password, phone, address, role } =
    req.body;

  if (req.user.role !== "admin") {
    res.status(403).json({ error: "Accès refusé" });
    return;
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "Utilisateur déjà existant" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        address,
        role,
        agencyId: req.user.agencyId,
      },
    });

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    console.error("Erreur création utilisateur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
