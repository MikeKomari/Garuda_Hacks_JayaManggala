import { RequestHandler } from "express";
import { prisma } from "../config/config";
import { STATUS } from "../utils/http/statusCodes";
import { AppError } from "../utils/http/AppError";

// Create Question
const createQuestion: RequestHandler = async (request, response, next) => {
  try {
    const { text, type, subChapterId, questionOrder, answers, vocab } =
      request.body;

    // const requesterId = request.body.payload.id;

    // const requester = await prisma.user.findUnique({
    //   where: {
    //     id: requesterId,
    //   },
    // });

    // if (!requester || requester.role !== "Admin")
    //   throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);

    if (!text)
      throw new AppError("Question text is required", STATUS.BAD_REQUEST);

    if (!type || !["Text", "Speech"].includes(type))
      throw new AppError(
        "Valid question type (Text or Speech) is required",
        STATUS.BAD_REQUEST
      );

    if (!subChapterId)
      throw new AppError("SubChapter ID is required", STATUS.BAD_REQUEST);

    if (!questionOrder || questionOrder < 1)
      throw new AppError(
        "Valid question order is required",
        STATUS.BAD_REQUEST
      );

    if (!answers || !Array.isArray(answers) || answers.length < 1)
      throw new AppError("At least one answer is required", STATUS.BAD_REQUEST);

    let correctAnswerCount = 0;
    for (const answer of answers) {
      if (!answer.text) {
        throw new AppError("Each answer must have text", STATUS.BAD_REQUEST);
      }
      if (answer.isCorrect) correctAnswerCount++;
    }
    if (correctAnswerCount !== 1) {
      throw new AppError(
        "Exactly one answer must be correct",
        STATUS.BAD_REQUEST
      );
    }

    // Validate vocab array if provided
    if (vocab) {
      if (!Array.isArray(vocab)) {
        throw new AppError("Vocabularies must be an array", STATUS.BAD_REQUEST);
      }
      for (const vocabEntry of vocab) {
        if (
          !vocabEntry.vocabText ||
          !vocabEntry.translatedText ||
          !vocabEntry.pronunciation
        ) {
          throw new AppError(
            "Each vocabulary entry must have vocabText, translatedText, and pronunciation",
            STATUS.BAD_REQUEST
          );
        }
      }
    }

    // Check if subChapter exists
    const existingSubChapter = await prisma.subChapter.findUnique({
      where: {
        id: subChapterId,
      },
      include: {
        chapter: {
          include: {
            story: {
              include: {
                region: true,
              },
            },
          },
        },
      },
    });

    if (!existingSubChapter)
      throw new AppError("SubChapter not found", STATUS.NOT_FOUND);

    const questionData = await prisma.question.create({
      data: {
        text,
        type,
        subChapterId,
        questionOrder,
        answer: {
          create: answers.map(
            (answer: { text: string; isCorrect: boolean }) => ({
              text: answer.text,
              isCorrect: answer.isCorrect,
            })
          ),
        },
        vocab: {
          create: vocab?.map(
            (vocabEntry: {
              vocabText: string;
              translatedText: string;
              pronunciation: string;
            }) => ({
              vocabText: vocabEntry.vocabText,
              translatedText: vocabEntry.translatedText,
              pronunciation: vocabEntry.pronunciation,
              regionId: existingSubChapter.chapter.story.regionId,
            })
          ),
        },
      },
      include: {
        answer: true,
        vocab: true,
      },
    });

    response.send({
      message: "Question created successfully",
      data: questionData,
    });
  } catch (error) {
    next(error);
  }
};

const getQuestionById: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    const question = await prisma.question.findUnique({
      where: {
        id,
      },
      include: {
        answer: true,
        vocab: true,
      },
    });
    if (!question) throw new AppError("Question not found", STATUS.NOT_FOUND);

    response.send({
      message: "Question retrieved successfully",
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

const getAllQuestion: RequestHandler = async (request, response, next) => {
  try {
    const questions = await prisma.question.findMany({
      include: {
        subChapter: {
          include: {
            chapter: {
              include: {
                story: true,
              },
            },
          },
        },
        answer: true,
        vocab: true,
      },
      orderBy: {
        questionOrder: "asc",
      },
    });

    response.send({
      message: "Questions retrieved successfully",
      data: questions,
    });
  } catch (error) {
    next(error);
  }
};

const updateQuestion: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { text, type, questionOrder } = request.body;

    // const requesterId = request.body.payload.id;

    // const requester = await prisma.user.findUnique({
    //   where: {
    //     id: requesterId,
    //   },
    // });
    // if (!requester || requester.role !== "Admin") {
    //   throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    // }

    const question = await prisma.question.findUnique({
      where: {
        id,
      },
    });

    if (!question) throw new AppError("Question not found", STATUS.NOT_FOUND);

    if (!text && !type && !questionOrder)
      throw new AppError(
        "At least one field (text, type, or questionOrder) is required",
        STATUS.BAD_REQUEST
      );

    if (type && !["Text", "Speech"].includes(type))
      throw new AppError(
        "Valid question type (Text or Speech) is required",
        STATUS.BAD_REQUEST
      );

    if (questionOrder && questionOrder < 1)
      throw new AppError(
        "Valid question order is required",
        STATUS.BAD_REQUEST
      );

    const updatedQuestion = await prisma.question.update({
      where: {
        id,
      },
      data: {
        text: text || question.text,
        type: type || question.type,
        questionOrder: questionOrder || question.questionOrder,
      },
    });

    response.send({
      message: "Question updated successfully",
      data: updatedQuestion,
    });
  } catch (error) {
    next(error);
  }
};

const deleteQuestion: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    // const requesterId = request.body.payload.id;

    // const requester = await prisma.user.findUnique({
    //   where: {
    //     id: requesterId,
    //   },
    // });
    // if (!requester || requester.role !== "Admin") {
    //   throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    // }

    const question = await prisma.question.findUnique({
      where: {
        id,
      },
    });

    if (!question) throw new AppError("Question not found", STATUS.NOT_FOUND);

    await prisma.question.delete({
      where: {
        id,
      },
    });

    response.send({
      message: "Question deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createQuestion,
  getQuestionById,
  getAllQuestion,
  updateQuestion,
  deleteQuestion,
};
