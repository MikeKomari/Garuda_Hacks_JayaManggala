import { prisma } from "../../config/config";

export async function seedStory() {
  try {
    const jawaRegion = await prisma.region.findUnique({
      where: {
        name: "Jawa",
      },
    });
    
    if (!jawaRegion)
      throw new Error("Jawa region not found. Please seed regions first.");

    const stories = [
      {
        title: "Introduction to Javanese",
        originalText: "Sugeng rawuh ing Jawa! Budaya Jawa sugih lan warni.",
        englishText: "Welcome to Java! Javanese culture is rich and colorful.",
        regionId: jawaRegion.id,
        vocab: [
          {
            vocabText: "Sugeng",
            translatedText: "Hello/Welcome",
            pronouncation: "Su-geng",
          },
          {
            vocabText: "Rawuh",
            translatedText: "Arrive",
            pronouncation: "Ra-wuh",
          },
        ],
      },
      {
        title: "Javanese Traditions",
        originalText: "Adat Jawa nduweni makna sing jero.",
        englishText: "Javanese traditions have deep meaning.",
        regionId: jawaRegion.id,
        vocab: [
          {
            vocabText: "Adat",
            translatedText: "Tradition",
            pronouncation: "A-dat",
          },
          {
            vocabText: "Nduweni",
            translatedText: "Have",
            pronouncation: "Ndu-we-ni",
          },
        ],
      },
    ];

    for (const story of stories) {
      await prisma.story.create({
        data: {
          title: story.title,
          originalText: story.originalText,
          englishText: story.englishText,
          regionId: story.regionId,
          vocab: {
            create: story.vocab.map((v) => ({
              vocabText: v.vocabText,
              translatedText: v.translatedText,
              pronouncation: v.pronouncation,
              regionId: story.regionId,
            })),
          },
        },
      });
    }

    console.log("Story seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding story data:", error);
  }
}
