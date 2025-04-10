import { Router } from "express";
import prisma  from "../../../db/prismaClient";

const router = Router();

router.get("/projects", async (req, res) => {

  try {
    const projects = await prisma.projects.findMany();
    const length = await prisma.projects.count();
    res.json({
      message: "Success get the projects",
      projects,
      length
    });
  } catch (error) {
    res.status(500).json({
      message: "Error get the project",
      error: error,
    });
  }
});

export default router; 