import { RequestHandler } from "express";
import fs from "fs";
import multer from "multer";
import { GoogleGenAI, createPartFromUri } from "@google/genai";
import { AppError } from "../utils/http/AppError";
import { STATUS } from "../utils/http/statusCodes";

const upload = multer({ dest: "uploads/" });

// Initialize Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

/**
 * Transcribe audio to text
 */
const transcribeAudio: RequestHandler = async (request, response, next) => {
  console.log("Received file:");
  try {
    // multer will attach the file to request.file

    if (!request.file) {
      throw new AppError("No audio file uploaded", STATUS.BAD_REQUEST);
    }

    const filePath = request.file.path;

    // Upload the MP3 file to Gemini
    const uploadedFile = await ai.files.upload({
      file: filePath,
      config: { mimeType: "audio/mp3" },
    });

    const parts = [
      { role: "user", content: "Generate a transcript of the speech." },
      createPartFromUri(uploadedFile.uri, uploadedFile.mimeType),
    ];

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: parts,
    });

    // Delete temp file
    fs.unlinkSync(filePath);

    if (!result.text) {
      throw new AppError(
        "Failed to transcribe audio",
        STATUS.INTERNAL_SERVER_ERROR
      );
    }

    response.send({
      message: "Transcription successful",
      transcription: result.text,
    });
  } catch (error) {
    next(error);
  }
};

export default { transcribeAudio, upload };
