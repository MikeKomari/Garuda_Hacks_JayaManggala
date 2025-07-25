import { RequestHandler } from "express";
import { STATUS } from "../utils/http/statusCodes";
import { AppError } from "../utils/http/AppError";
import { prisma } from "../config/config";

const createChapter: RequestHandler = async (request, response, next) => {
  try {
    const { title, storyId, chapterOrder } = request.body;

    if (!title)
      throw new AppError("Chapter title is required", STATUS.BAD_REQUEST);

    if (!storyId)
      throw new AppError("Story ID is required", STATUS.BAD_REQUEST);

    if (!chapterOrder || chapterOrder < 1)
      throw new AppError("Valid Chapter order is required", STATUS.BAD_REQUEST);

    // const requesterId = request.body.payload.id;
    // const requester = await prisma.user.findUnique({
    //     where: {
    //         id: requesterId,
    //     },
    // });
    // if (!requester || requester.role !== "Admin")
    //     throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);

    const existingStory = await prisma.story.findUnique({
      where: {
        id: storyId,
      },
    });

    if (!existingStory) throw new AppError("Story not found", STATUS.NOT_FOUND);

    const chapterData = await prisma.chapter.create({
      data: {
        title,
        storyId,
        chapterOrder,
      },
    });

    response.send({
      message: "Chapter created successfully",
      data: chapterData,
    });
  } catch (error) {
    next(error);
  }
};

const getChapterById: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    if (!id) throw new AppError("Chapter ID is required", STATUS.BAD_REQUEST);

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: id,
      },
      include: {
        subChapter: true,
      },
    });

    if (!chapter) throw new AppError("Chapter not found", STATUS.NOT_FOUND);

    response.send({
      message: "Chapter retrieved successfully",
      data: chapter,
    });
  } catch (error) {
    next(error);
  }
};

const getAllChapter: RequestHandler = async (request, response, next) => {
  try {
    const chapters = await prisma.chapter.findMany({
      include: {
        story: true,
        subChapter: true,
      },
      orderBy: {
        chapterOrder: "asc",
      },
    });

    response.send({
      message: "Chapters retrieved successfully",
      data: chapters,
    });
  } catch (error) {
    next(error);
  }
};

const deleteChapter: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    if (!id) throw new AppError("Chapter ID is required", STATUS.BAD_REQUEST);

    // const requesterId = request.body.payload.id;
    // const requester = await prisma.user.findUnique({
    //     where: {
    //         id: requesterId,
    //     },
    // });
    // if (!requester || requester.role !== "Admin")
    //     throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);

    const existingChapter = await prisma.chapter.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingChapter)
      throw new AppError("Chapter not found", STATUS.NOT_FOUND);

    await prisma.chapter.delete({
      where: {
        id: id,
      },
    });

    response.send({
      message: "Chapter deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateChapter: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { title, chapterOrder } = request.body;

    if (!id) throw new AppError("Chapter ID is required", STATUS.BAD_REQUEST);
    if (!title)
      throw new AppError("Chapter title is required", STATUS.BAD_REQUEST);
    if (!chapterOrder || chapterOrder < 1)
      throw new AppError("Valid Chapter order is required", STATUS.BAD_REQUEST);

    const existingChapter = await prisma.chapter.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingChapter)
      throw new AppError("Chapter not found", STATUS.NOT_FOUND);

    const updatedChapter = await prisma.chapter.update({
      where: {
        id: id,
      },
      data: {
        title,
        chapterOrder,
      },
    });

    response.send({
      message: "Chapter updated successfully",
      data: updatedChapter,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createChapter,
  getChapterById,
  getAllChapter,
  deleteChapter,
  updateChapter,
};
