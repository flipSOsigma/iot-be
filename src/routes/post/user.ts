import { Router } from "express";
import prisma  from "../../db/prismaClient";

interface IUserBody {
  photoUrl: string;
  username: string;
  email: string;
  password: string;
  status: string;
}

const router = Router();

router.post("/user", async (req, res) => {
  const { photoUrl, username, email, password, status }: IUserBody = req.body;

  try {
    res.json({
      message: "User created successfully",
      user: await prisma.users.create({
        data: {
          photoUrl,
          username, 
          email,
          password,
          status,
        },
      }),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error,
    });
  }
});

export default router;
