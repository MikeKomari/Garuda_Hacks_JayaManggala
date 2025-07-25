import { RequestHandler } from "express";
import { prisma } from "../config/config";
import { STATUS } from "../utils/http/statusCodes";
import { AppError } from "../utils/http/AppError";

// Create Answer
const createAnswer: RequestHandler = async (request, response, next) => {
  try {
    const { text, isCorrect, questionId } = request.body;

    // const requesterId = request.body.payload.id;

    // const requester = await prisma.user.findUnique({
    //   where: {
    //     id: requesterId,
    //   },
    // });
    // if (!requester || requester.role !== "Admin")
    //   throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);

    if (!text)
      throw new AppError("Answer text is required", STATUS.BAD_REQUEST);

    if (isCorrect === undefined)
      throw new AppError("isCorrect field is required", STATUS.BAD_REQUEST);

    if (!questionId)
      throw new AppError("Question ID is required", STATUS.BAD_REQUEST);

    const existingQuestion = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
      include: {
        answer: true,
      },
    });

    if (!existingQuestion)
      throw new AppError("Question not found", STATUS.NOT_FOUND);

    if (
      isCorrect &&
      existingQuestion.answer.some((answer) => answer.isCorrect)
    ) {
      throw new AppError(
        "Question already has a correct answer",
        STATUS.BAD_REQUEST
      );
    }

    const answerData = await prisma.answer.create({
      data: {
        text,
        isCorrect,
        questionId,
      },
    });

    response.send({
      message: "Answer created successfully",
      data: answerData,
    });
  } catch (error) {
    next(error);
  }
};

const getAnswer: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    const answer = await prisma.answer.findUnique({
      where: {
        id,
      },
    });
    if (!answer) throw new AppError("Answer not found", STATUS.NOT_FOUND);

    response.send({
      message: "Answer retrieved successfully",
      data: answer,
    });
  } catch (error) {
    next(error);
  }
};

const updateAnswer: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { text, isCorrect } = request.body;
    // const requesterId = request.body.payload.id;

    // const requester = await prisma.user.findUnique({
    //   where: {
    //     id: requesterId,
    //   },
    // });

    // if (!requester || requester.role !== "Admin")
    //   throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);

    const answer = await prisma.answer.findUnique({
      where: {
        id,
      },
      include: {
        question: {
          include: {
            answer: true,
          },
        },
      },
    });

    if (!answer) throw new AppError("Answer not found", STATUS.NOT_FOUND);

    if (!text && isCorrect === undefined) {
      throw new AppError(
        "At least one field (text or isCorrect) is required",
        STATUS.BAD_REQUEST
      );
    }

    if (
      isCorrect !== undefined &&
      isCorrect &&
      answer.question.answer.some((a) => a.isCorrect && a.id !== id)
    ) {
      throw new AppError(
        "Question already has a correct answer",
        STATUS.BAD_REQUEST
      );
    }

    const updatedAnswer = await prisma.answer.update({
      where: {
        id,
      },
      data: {
        text: text || answer.text,
        isCorrect: isCorrect !== undefined ? isCorrect : answer.isCorrect,
      },
    });

    response.send({
      message: "Answer updated successfully",
      data: updatedAnswer,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAnswer: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    // const requesterId = request.body.payload.id;

    // const requester = await prisma.user.findUnique({
    //   where: {
    //     id: requesterId,
    //   },
    // });

    // if (!requester || requester.role !== "Admin")
    //   throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);

    const answer = await prisma.answer.findUnique({
      where: {
        id,
      },
    });

    if (!answer) throw new AppError("Answer not found", STATUS.NOT_FOUND);

    await prisma.answer.delete({
      where: {
        id,
      },
    });

    response.send({
      message: "Answer deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { createAnswer, getAnswer, updateAnswer, deleteAnswer };
