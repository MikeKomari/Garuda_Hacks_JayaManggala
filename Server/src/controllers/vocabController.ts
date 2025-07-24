import { RequestHandler } from "express";
import { STATUS } from "../utils/http/statusCodes";
import { AppError } from "../utils/http/AppError";
import { prisma } from "../config/config";

const createVocab: RequestHandler = async (request, response, next) => {
  try {
    const { vocabText, translatedText, pronouncation, regionId } = request.body;
    if (!vocabText)
      throw new AppError("Vocab text is required", STATUS.BAD_REQUEST);

    if (!translatedText)
      throw new AppError("Translated text is required", STATUS.BAD_REQUEST);

    if (!pronouncation)
      throw new AppError("Pronouncation is required", STATUS.BAD_REQUEST);

    if (!regionId)
      throw new AppError("Region ID is required", STATUS.BAD_REQUEST);

    const requesterId = request.body.payload.id;
    const requester = await prisma.user.findUnique({
      where: {
        id: requesterId,
      },
    });

    if (!requester || requester.role !== "Admin")
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);

    const existingRegion = await prisma.region.findUnique({
      where: {
        id: regionId,
      },
    });

    if (!existingRegion)
      throw new AppError("Region not found", STATUS.NOT_FOUND);

    const vocabData = await prisma.vocabulary.create({
      data: {
        vocabText,
        translatedText,
        pronouncation,
        regionId,
      },
    });
    response.send({
      message: "Vocabulary created successfully",
      data: vocabData,
    });
  } catch (error) {
    next(error);
  }
};

const editVocab: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    if (!id) throw new AppError("Vocab ID is required", STATUS.BAD_REQUEST);

    const { vocabText, translatedText, pronouncation, regionId } = request.body;
    if (!vocabText)
      throw new AppError("Vocab text is required", STATUS.BAD_REQUEST);

    if (!translatedText)
      throw new AppError("Translated text is required", STATUS.BAD_REQUEST);

    if (!pronouncation)
      throw new AppError("Pronouncation is required", STATUS.BAD_REQUEST);

    if (!regionId)
      throw new AppError("Region ID is required", STATUS.BAD_REQUEST);

    const requesterId = request.body.payload.id;
    const requester = await prisma.user.findUnique({
      where: {
        id: requesterId,
      },
    });

    if (!requester || requester.role !== "Admin")
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);

    const existingRegion = await prisma.region.findUnique({
      where: {
        id: regionId,
      },
    });

    if (!existingRegion)
      throw new AppError("Region not found", STATUS.NOT_FOUND);

    const vocabData = await prisma.vocabulary.create({
      data: {
        vocabText,
        translatedText,
        pronouncation,
        regionId,
      },
    });
    response.send({
      message: "Vocabulary created successfully",
      data: vocabData,
    });
  } catch (error) {
    next(error);
  }
};

const getVocab: RequestHandler = async (request, response, next) => {
  try {
    const vocabData = await prisma.vocabulary.findMany({
      include: {
        region: true,
      },
    });

    response.send({
      message: "Vocab retrieved successfully",
      data: vocabData,
    });
  } catch (error) {
    next(error);
  }
};

const getVocabByRegion: RequestHandler = async (request, response, next) => {
  try {
    const { regionId } = request.params;
    if (!regionId)
      throw new AppError("Region ID is required", STATUS.BAD_REQUEST);

    const vocabData = await prisma.vocabulary.findMany({
      where: {
        regionId: regionId,
      },
      include: {
        region: true,
      },
    });

    if (vocabData.length === 0) {
      throw new AppError("No vocab found for this region", STATUS.NOT_FOUND);
    }

    response.send({
      message: "Vocab retrieved successfully",
      data: vocabData,
    });
  } catch (error) {
    next(error);
  }
};

const deleteVocab: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    if (!id) throw new AppError("Vocab ID is required", STATUS.BAD_REQUEST);

    const requesterId = request.body.payload.id;
    const requester = await prisma.user.findUnique({
      where: {
        id: requesterId,
      },
    });

    if (!requester || requester.role !== "Admin")
      throw new AppError("Unauthorized", STATUS.UNAUTHORIZED);

    const existingVocab = await prisma.vocabulary.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingVocab) throw new AppError("Vocab not found", STATUS.NOT_FOUND);

    await prisma.vocabulary.delete({
      where: {
        id: id,
      },
    });

    response.send({
      message: "Vocab deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createVocab,
  editVocab,
  getVocab,
  getVocabByRegion,
  deleteVocab,
};
