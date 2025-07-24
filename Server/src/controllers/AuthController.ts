import { RequestHandler } from "express";
import { prisma } from "../config/config";
import { AppError } from "../utils/http/AppError";
import { STATUS } from "../utils/http/statusCodes";
import bcrypt from "bcrypt";
import { createJWT } from "../utils/helper";
import axios from "axios";

const loginGoogle: RequestHandler = async (request, response, next) => {
  try {
    const token = request.body.token;
    if (!token) {
      throw new AppError("Token is required", STATUS.BAD_REQUEST);
    }
    const userData = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?token=${token}`
    );

    const existingUser = await prisma.user.findUnique({
      where: {
        email: userData.data.email,
      },
    });

    if (existingUser)
      throw new AppError("User already exists", STATUS.BAD_REQUEST);

    let user;
    if (existingUser) user = existingUser;
    else {
      user = await prisma.user.create({
        data: {
          name: userData.data.name,
          email: userData.data.email,
          password: "",
          role: "User",
        },
      });
    }

    const jwtToken = createJWT(user);
    if (!jwtToken)
      throw new AppError(
        "Failed to create JWT token",
        STATUS.INTERNAL_SERVER_ERROR
      );

    response.send({
      message: "User logged in successfully",
      data: user,
      token: jwtToken,
    });
  } catch (error) {
    next(error);
  }
};

const registerUser: RequestHandler = async (request, response, next) => {
  try {
    const { email, password, name, age } = request.body;

    const exisitingUser = await prisma.user.findUnique({
      where: {
        email: email || null,
      },
    });

    if (exisitingUser)
      throw new AppError("User already exists", STATUS.BAD_REQUEST);

    const hashPassword = await bcrypt.hash(password, 10);

    if (!age || age < 0) throw new AppError("Invalid age", STATUS.BAD_REQUEST);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        name,
        age,
      },
    });

    const jwtToken = createJWT(newUser);
    if (!jwtToken)
      throw new AppError(
        "Failed to create JWT token",
        STATUS.INTERNAL_SERVER_ERROR
      );
    response.send({
      message: "User created successfully",
      data: newUser,
      token: jwtToken,
    });
  } catch (error) {
    next(error);
  }
};

export default { registerUser, loginGoogle };
