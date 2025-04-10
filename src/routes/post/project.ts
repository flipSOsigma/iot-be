import { Router } from "express";
import prisma  from "../../db/prismaClient";


interface IProjectsBody {
  ownerUniqueId: string;
  devices: number;
  input: number;
  output: number;
  projectTitle: string;
  projectDescription? : string
}

const router = Router();

router.post("/project", async (req, res) => {
  const { ownerUniqueId, devices, input, output, projectTitle, projectDescription }: IProjectsBody = req.body;
  try {
    if( await isUserPremium(ownerUniqueId) ) {
      res.json({
        message: "User created successfully",
        project: await createProjects({
          ownerUniqueId,
          devices,
          input,
          output,
          projectTitle,
          projectDescription: projectDescription ? projectDescription : ""
        }),
      });
    } else {
      if( await getLengthProjects(ownerUniqueId) <= 3 ) {
        res.json({
          message: "User created successfully",
          project: await createProjects({
            ownerUniqueId,
            devices,
            input,
            output,
            projectTitle,
            projectDescription: projectDescription ? projectDescription : ""
          }),
        });
      }else{
        res.json({
          message: "User can't create more than 3 projects in not premium condition"
        })
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error,
    });
  }
});

async function createProjects({ownerUniqueId, devices, input, output, projectTitle, projectDescription}: IProjectsBody) {
  return await prisma.projects.create({
    data: { 
      ownerUniqueId, devices, input, output, projectTitle, projectDescription
    }
  })
}

async function getLengthProjects(ownerUniqueId: string) {
  return await prisma.projects.count({
    where: {
      ownerUniqueId: ownerUniqueId
    }
  });
}

async function isUserPremium(ownerUniqueId: string) {  
  const checking = await prisma.users.findUnique({
    where: {
      uniqueId: ownerUniqueId
    }, 
    select: {
      status: true
    }
  })
  return checking ? checking.status === "Premium" ? true : false : false
}

export default router;
