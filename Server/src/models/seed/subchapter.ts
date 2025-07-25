import { prisma } from "../../config/config";

export async function seedSubChapter() {
  try {
    const chapter = await prisma.chapter.findFirst({
      where: {
        title: "Chapter 1: Basic Greetings",
        story: {
          title: "Introduction to Javanese",
        },
      },
    });

    if (!chapter)
      throw new Error(
        "Chapter 1: Basic Greetings not found. Please seed chapters first."
      );

    const jawaRegion = await prisma.region.findUnique({
      where: {
        name: "Jawa",
      },
    });

    if (!jawaRegion)
      throw new Error("Jawa region not found. Please seed regions first.");

    const subChapters = [
      {
        title: "Introduction to Javanese",
        chapterId: chapter.id,
        subChapterOrder: 1,
        vocab: [
          {
            vocabText: "Sugeng",
            translatedText: "Hello/Welcome",
            pronouncation: "Su-geng",
          },
          {
            vocabText: "Matur Nuwun",
            translatedText: "Thank you",
            pronouncation: "Ma-tur Nu-wun",
          },
        ],
      },
      {
        title: "Basic Speaking in Javanese",
        chapterId: chapter.id,
        subChapterOrder: 2,
        vocab: [
          {
            vocabText: "Apa Kabar",
            translatedText: "How are you",
            pronouncation: "A-pa Ka-bar",
          },
          { vocabText: "Piye", translatedText: "How", pronouncation: "Pi-ye" },
        ],
      },
    ];

    for (const subChapter of subChapters) {
      await prisma.subChapter.create({
        data: {
          title: subChapter.title,
          chapterId: subChapter.chapterId,
          subChapterOrder: subChapter.subChapterOrder,
          vocab: {
            create: subChapter.vocab.map((v) => ({
              vocabText: v.vocabText,
              translatedText: v.translatedText,
              pronouncation: v.pronouncation,
              regionId: jawaRegion.id,
            })),
          },
        },
      });
    }

    console.log("SubChapter seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding subChapter data:", error);
  }
}
