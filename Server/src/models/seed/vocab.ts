import { prisma } from "../../config/config";

export async function seedVocabulary() {
  try {
    const jawaRegion = await prisma.region.findUnique({
      where: {
        name: "Jawa",
      },
    });

    if (!jawaRegion)
      throw new Error("Jawa region not found. Please seed regions first.");

    const vocabularies = [
      {
        vocabText: "Jenengku",
        translatedText: "My name is",
        pronouncation: "Je-neng-ku",
        regionId: jawaRegion.id,
      },
      {
        vocabText: "Kowe",
        translatedText: "You",
        pronouncation: "Ko-we",
        regionId: jawaRegion.id,
      },
      {
        vocabText: "Apa",
        translatedText: "What",
        pronouncation: "A-pa",
        regionId: jawaRegion.id,
      },
      {
        vocabText: "Piye",
        translatedText: "How",
        pronouncation: "Pi-ye",
        regionId: jawaRegion.id,
      },
    ];

    for (const vocab of vocabularies) {
      await prisma.vocabulary.create({
        data: {
          vocabText: vocab.vocabText,
          translatedText: vocab.translatedText,
          pronouncation: vocab.pronouncation,
          regionId: vocab.regionId,
        },
      });
    }

    console.log("Vocabulary seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding vocabulary data:", error);
  }
}
