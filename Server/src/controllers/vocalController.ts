import { RequestHandler } from "express";
import axios from "axios";
import fs from "fs-extra";
import { AppError } from "../utils/http/AppError";
import OpenAI from "openai";
const baseUrl = "https://api.assemblyai.com";

const headers = {
  authorization: process.env.ASSEMBLY_API_KEY,
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const checkPronounciation: RequestHandler = async (request, response, next) => {
  try {
    if (!request.file) {
      throw new AppError("No audio file uploaded", 400);
    }
    const filePath = request.file.path;
    const originalText = request.body.ori;
    const audioData = await fs.readFile(filePath);

    // Upload to AssemblyAI
    const uploadResponse = await axios.post(`${baseUrl}/v2/upload`, audioData, {
      headers: {
        ...headers,
        "Content-Type": "application/octet-stream",
      },
    });
    const audioUrl = uploadResponse.data.upload_url;

    const data = {
      audio_url: audioUrl,
      speech_model: "universal",
      language_code: "jw", // Javanese may not be supported; try auto-detect
    };

    const transcriptResponse = await axios.post(
      `${baseUrl}/v2/transcript`,
      data,
      { headers }
    );
    const transcriptId = transcriptResponse.data.id;
    const pollingEndpoint = `${baseUrl}/v2/transcript/${transcriptId}`;

    const pollTranscription = async () => {
      while (true) {
        const pollingResponse = await axios.get(pollingEndpoint, { headers });
        const transcriptionResult = pollingResponse.data;

        if (transcriptionResult.status === "completed") {
          return transcriptionResult.text;
        } else if (transcriptionResult.status === "error") {
          throw new Error(transcriptionResult.error);
        }
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    };

    const textTranscription = await pollTranscription();
    await fs.remove(filePath); // Clean up temp file

    // OPEN AI
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      throw new AppError("OpenAI API key is not set", 500);
    }

    const openAIResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                `Fi am currently learning speaking javanese, this is the text that I am reading\n\n` +
                originalText +
                "So i read it and use an AI to transcribe it and returne\n\n" +
                textTranscription +
                `\n\n please rate how my speaking out of 100 and give me one sentence on my performance like how well i do, please dont be too harsh. return and limit your response in a json format where\n\n` +
                `{
                    "score": number
                    "comments": string 
                     
                  }
                  return without any further quotation just direct json format`,
            },
          ],
        },
      ],
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
    });
    const scorings = await openAIResponse.choices[0].message.content;

    if (!scorings) {
      throw new AppError("No scoring received from AI", 500);
    }
    response.send({
      message: "Scored successfully",
      data: scorings,
    });
  } catch (error) {
    next(error);
  }
};

export default { checkPronounciation };
