import { Router } from "express";
import prisma  from "../../../db/prismaClient";

const router = Router();

const orCondition = (params: string) => {
  return [
    {
      projectTitle: params
    }, {
      projectUniqueId: params
    }, {
      ownerUniqueId: params
    }
  ]
}

router.get("/projects/:parameter", async (req, res) => {
  const { parameter } = req.params;
  try {
    const users = await prisma.projects.findMany({ 
      where: {
        OR: orCondition(parameter)
      }
    });
    const length = await prisma.projects.count({
      where: {
        OR: orCondition(parameter)
      }
    });
    res.json({
      message: "Success get the users where contain " + parameter,
      users,
      length
    });
  } catch (error) {
    res.status(500).json({
      message: "Error get the user where contain " + parameter,
      error: error,
    });
  }
});

export default router; 