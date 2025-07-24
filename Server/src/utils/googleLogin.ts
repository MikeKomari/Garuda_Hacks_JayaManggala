import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { createJWT } from "./helper";

const prisma = new PrismaClient();

export const loginGoogle = async (token: string) => {
  const userData = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const existingUser = await prisma.user.findUnique({
    where: {
      email: userData.data.email,
    },
  });

  let newUser;
  if (existingUser) {
    console.log("User already exists:", existingUser);
    newUser = existingUser;
  } else {
    console.log("User does not exist, creating new user...");
    newUser = await prisma.user.create({
      data: {
        name: userData.data.name,
        email: userData.data.email,
        password: "",
        role: "User",
      },
    });
  }

  return createJWT(existingUser || newUser);
};
