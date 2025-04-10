import { Router } from "express";
import prisma  from "../../../db/prismaClient";

const router = Router();

router.get("/users", async (req, res) => {

  try {
    const users = await prisma.users.findMany();
    const length = await prisma.users.count();
    res.json({
      message: "Success get the users",
      users,
      length
    });
  } catch (error) {
    res.status(500).json({
      message: "Error get the user",
      error: error,
    });
  }
});

export default router; 