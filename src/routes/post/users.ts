import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const prisma = new PrismaClient();
const router = Router();

router.post('/users', async (req, res) => {
  const { photoUrl, username, email, password, status }: {photoUrl: string, username: string, email: string, password: string, status: string} = req.body;
  try {
    const newUser = await prisma.users.create({
      data: {
        photoUrl,
        username,
        email,
        password,
        status,
      },
    });
    res.json({
      message: "User created successfully",
      user: newUser
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message
    });
  }
});

export default router;

