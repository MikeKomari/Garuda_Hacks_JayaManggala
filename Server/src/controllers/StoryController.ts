import { RequestHandler } from "express";
import { AppError } from "../utils/http/AppError";
import { STATUS } from "../utils/http/statusCodes";
import { prisma } from "../config/config";

const createStory: RequestHandler = async (request, response, next) => {
  try {
    const { title, regionId, originalText, englishText, vocab } = request.body;
    const requesterId = request.body.payload.id;
    const requester = await prisma.user.findUnique({
      where: {
        id: requesterId,
      },
    });
    if (!requester || requester.role !== "Admin")
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);

    if (!title)
      throw new AppError("Story title is required", STATUS.BAD_REQUEST);

    if (!regionId)
      throw new AppError("Region ID is required", STATUS.BAD_REQUEST);

    if (!originalText)
      throw new AppError("Original text is required", STATUS.BAD_REQUEST);

    if (!englishText)
      throw new AppError("English text is required", STATUS.BAD_REQUEST);

    if (vocab) {
      if (!Array.isArray(vocab)) {
        throw new AppError("Vocabularies must be an array", STATUS.BAD_REQUEST);
      }
      for (const vocabularies of vocab) {
        if (
          !vocabularies.vocabText ||
          !vocabularies.translatedText ||
          !vocabularies.pronouncation
        ) {
          throw new AppError(
            "Each vocabulary entry must have vocabText, translatedText, and pronouncation",
            STATUS.BAD_REQUEST
          );
        }
      }
    }

    const existingRegion = await prisma.region.findUnique({
      where: {
        id: regionId,
      },
    });

    if (!existingRegion)
      throw new AppError("Region not found", STATUS.NOT_FOUND);

    const storyData = await prisma.story.create({
      data: {
        title,
        regionId,
        originalText,
        englishText,
        vocab: {
          create: vocab.map(
            (vocabEntry: {
              vocabText: string;
              translatedText: string;
              pronouncation: string;
            }) => ({
              vocabText: vocabEntry.vocabText,
              translatedText: vocabEntry.translatedText,
              pronouncation: vocabEntry.pronouncation,
              regionId,
            })
          ),
        },
      },
      include: {
        vocab: true,
      },
    });

    response.send({
      message: "Story created successfully",
      data: storyData,
    });
  } catch (error) {
    next(error);
  }
};

const editStory: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    if (!id) throw new AppError("Story ID is required", STATUS.BAD_REQUEST);

    const { title, regionId, originalText, englishText, vocab } = request.body;

    const requesterId = request.body.payload.id;
    const requester = await prisma.user.findUnique({
      where: {
        id: requesterId,
      },
    });
    if (!requester || requester.role !== "Admin")
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);

    if (!title)
      throw new AppError("Story title is required", STATUS.BAD_REQUEST);

    if (!regionId)
      throw new AppError("Region ID is required", STATUS.BAD_REQUEST);

    if (!originalText)
      throw new AppError("Original text is required", STATUS.BAD_REQUEST);

    if (!englishText)
      throw new AppError("English text is required", STATUS.BAD_REQUEST);

    if (vocab) {
      if (!Array.isArray(vocab)) {
        throw new AppError("Vocabularies must be an array", STATUS.BAD_REQUEST);
      }
      for (const vocabularies of vocab) {
        if (
          !vocabularies.vocabText ||
          !vocabularies.translatedText ||
          !vocabularies.pronouncation
        ) {
          throw new AppError(
            "Each vocabulary entry must have vocabText, translatedText, and pronouncation",
            STATUS.BAD_REQUEST
          );
        }
      }
    }
    const existingStory = await prisma.story.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingStory) throw new AppError("Story not found", STATUS.NOT_FOUND);
    const existingRegion = await prisma.region.findUnique({
      where: {
        id: regionId,
      },
    });
    if (!existingRegion)
      throw new AppError("Region not found", STATUS.NOT_FOUND);
    const updatedStory = await prisma.story.update({
      where: {
        id: id,
      },
      data: {
        title: title ?? existingStory.title,
        regionId: regionId ?? existingStory.regionId,
        originalText: originalText ?? existingStory.originalText,
        englishText: englishText ?? existingStory.englishText,
        // Update vocab if provided the id, otherwise create new vocab
        vocab: vocab
          ? {
              upsert: vocab.map(
                (vocabEntry: {
                  id?: string;
                  vocabText: string;
                  translatedText: string;
                  pronouncation: string;
                }) => ({
                  where: {
                    id: vocabEntry.id ?? "",
                  },
                  update: {
                    vocabText: vocabEntry.vocabText,
                    translatedText: vocabEntry.translatedText,
                    pronouncation: vocabEntry.pronouncation,
                    regionId: regionId ?? existingStory.regionId,
                  },
                  create: {
                    vocabText: vocabEntry.vocabText,
                    translatedText: vocabEntry.translatedText,
                    pronouncation: vocabEntry.pronouncation,
                    regionId: regionId ?? existingStory.regionId,
                  },
                })
              ),
            }
          : undefined,
      },
      include: {
        vocab: true,
      },
    });

    response.send({
      message: "Story updated successfully",
      data: updatedStory,
    });
  } catch (error) {
    next(error);
  }
};

const getStory: RequestHandler = async (request, response, next) => {
  try {
    const stories = await prisma.story.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        region: true,
      },
    });

    if (!stories || stories.length === 0)
      throw new AppError("No stories found", STATUS.NOT_FOUND);

    response.send({
      message: "Stories retrieved successfully",
      data: stories,
    });
  } catch (error) {
    next(error);
  }
};

const getStoryById: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    if (!id) throw new AppError("Story ID is required", STATUS.BAD_REQUEST);

    const story = await prisma.story.findUnique({
      where: {
        id: id,
      },
      include: {
        region: true,
        vocab: true,
      },
    });

    if (!story) throw new AppError("Story not found", STATUS.NOT_FOUND);

    response.send({
      message: "Story retrieved successfully",
      data: story,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStory: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    if (!id) throw new AppError("Story ID is required", STATUS.BAD_REQUEST);

    const requesterId = request.body.payload.id;
    const requester = await prisma.user.findUnique({
      where: {
        id: requesterId,
      },
    });
    if (!requester || requester.role !== "Admin")
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);

    const existingStory = await prisma.story.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingStory) throw new AppError("Story not found", STATUS.NOT_FOUND);

    await prisma.story.delete({
      where: {
        id: id,
      },
    });

    response.send({
      message: "Story deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default { createStory, editStory, getStory, getStoryById, deleteStory };
