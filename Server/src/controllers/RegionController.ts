import { RequestHandler } from "express";
import { STATUS } from "../utils/http/statusCodes";
import { AppError } from "../utils/http/AppError";
import { prisma } from "../config/config";

const createRegion: RequestHandler = async (request, response, next) => {
  try {
    const { name } = request.body;
    if (!name) {
      throw new AppError("Region name is required", STATUS.BAD_REQUEST);
    }

    const regionData = await prisma.region.create({
      data: {
        name,
      },
    });

    response.send({
      message: "Region created successfully",
      data: regionData,
    });
  } catch (error) {
    next(error);
  }
};

const editRegion: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    if (!id) throw new AppError("Region ID is required", STATUS.BAD_REQUEST);

    const { name } = request.body;
    if (!name)
      throw new AppError("Region name is required", STATUS.BAD_REQUEST);

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
        id: id,
      },
    });

    if (!existingRegion)
      throw new AppError("Region not found", STATUS.NOT_FOUND);

    const updateRegion = await prisma.region.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });

    response.send({
      message: "Region updated successfully",
      data: updateRegion,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRegion: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    if (!id) throw new AppError("Region ID is required", STATUS.BAD_REQUEST);

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
        id: id,
      },
    });

    if (!existingRegion)
      throw new AppError("Region not found", STATUS.NOT_FOUND);

    const deleteRegion = await prisma.region.delete({
      where: {
        id: id,
      },
    });

    response.send({
      message: "Region deleted successfully",
      data: deleteRegion,
    });
  } catch (error) {
    next(error);
  }
};

const getRegions: RequestHandler = async (request, response, next) => {
  try {
    const regions = await prisma.region.findMany({
      orderBy: {
        name: "desc",
      },
    });

    response.send({
      message: "Regions retrieved successfully",
      data: regions,
    });
  } catch (error) {
    next(error);
  }
};

const getRegionById: RequestHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    if (!id) throw new AppError("Region ID is required", STATUS.BAD_REQUEST);
    const region = await prisma.region.findUnique({
      where: {
        id: id,
      },
    });
    if (!region) throw new AppError("Region not found", STATUS.NOT_FOUND);
    response.send({
      message: "Region retrieved successfully",
      data: region,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createRegion,
  editRegion,
  deleteRegion,
  getRegions,
  getRegionById,
};
