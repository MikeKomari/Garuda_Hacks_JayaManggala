import { RequestHandler } from "express";
import { STATUS } from "../utils/http/statusCodes";
import { AppError } from "../utils/http/AppError";
import { prisma } from "../config/config";

const createSubChapter: RequestHandler = async (request, response, next) => {
  try {
    const { title, chapterId, subChapterOrder, vocab } = request.body;

    // const requesterId = request.body.payload.id;

    // const requester = await prisma.user.findUnique({
    //   where: {
    //     id: requesterId,
    //   },
    // });

    // if (!requester || requester.role !== "Admin") {
    //   throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    // }

    if (!title)
      throw new AppError("SubChapter title is required", STATUS.BAD_REQUEST);

    if (!subChapterOrder || subChapterOrder < 1)
      throw new AppError(
        "Valid SubChapter order is required",
        STATUS.BAD_REQUEST
      );

    if (!chapterId)
      throw new AppError("Chapter ID is required", STATUS.BAD_REQUEST);

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

    const existingChapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
      include: {
        story: {
          include: { region: true },
        },
      },
    });

    if (!existingChapter)
      throw new AppError("Chapter not found", STATUS.NOT_FOUND);

    const newSubChapter = await prisma.subChapter.create({
      data: {
        title,
        subChapterOrder,
        chapterId,
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
              regionId: existingChapter.story.regionId,
            })
          ),
        },
      },
      include: {
        vocab: true,
      },
    });

    response.send({
      message: "SubChapter created successfully",
      data: newSubChapter,
    });
  } catch (error) {
    next(error);
  }
};

const getSubChapterById: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    const subChapter = await prisma.subChapter.findUnique({
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
    if (!subChapter) {
      throw new AppError("SubChapter not found", STATUS.NOT_FOUND);
    }

    response.send({
      message: "SubChapter retrieved successfully",
      data: subChapter,
    });
  } catch (error) {
    next(error);
  }
};

const getAllSubChapters: RequestHandler = async (request, response, next) => {
  try {
    const subChapters = await prisma.subChapter.findMany({
      include: {
        chapter: true,
        vocab: true,
      },
      orderBy: {
        subChapterOrder: "asc",
      },
    });

    response.send({
      message: "SubChapters retrieved successfully",
      data: subChapters,
    });
  } catch (error) {
    next(error);
  }
};

const updateSubChapter: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { title, subChapterOrder } = request.body;

    if (!id)
      throw new AppError("SubChapter ID is required", STATUS.BAD_REQUEST);

    // const requesterId = request.body.payload.id;

    // const requester = await prisma.user.findUnique({
    //   where: {
    //     id: requesterId,
    //   },
    // });
    // if (!requester || requester.role !== "Admin") {
    //   throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    // }

    // Check if subChapter exists
    const subChapter = await prisma.subChapter.findUnique({
      where: {
        id,
      },
    });
    if (!subChapter)
      throw new AppError("SubChapter not found", STATUS.NOT_FOUND);

    if (!title && !subChapterOrder) {
      throw new AppError(
        "At least one field (title or subChapterOrder) is required",
        STATUS.BAD_REQUEST
      );
    }
    if (subChapterOrder && subChapterOrder < 1) {
      throw new AppError(
        "Valid subChapter order is required",
        STATUS.BAD_REQUEST
      );
    }

    const updatedSubChapter = await prisma.subChapter.update({
      where: {
        id,
      },
      data: {
        title: title || subChapter.title,
        subChapterOrder: subChapterOrder || subChapter.subChapterOrder,
      },
    });

    response.send({
      message: "SubChapter updated successfully",
      data: updatedSubChapter,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSubChapter: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!id)
      throw new AppError("SubChapter ID is required", STATUS.BAD_REQUEST);

    // const requesterId = request.body.payload.id;

    // const requester = await prisma.user.findUnique({
    //   where: {
    //     id: requesterId,
    //   },
    // });
    // if (!requester || requester.role !== "Admin") {
    //   throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);
    // }

    const existingSubChapter = await prisma.subChapter.findUnique({
      where: {
        id,
      },
    });

    if (!existingSubChapter)
      throw new AppError("SubChapter not found", STATUS.NOT_FOUND);

    await prisma.subChapter.delete({
      where: {
        id,
      },
    });

    response.send({
      message: "SubChapter deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createSubChapter,
  getSubChapterById,
  updateSubChapter,
  deleteSubChapter,
  getAllSubChapters,
};
