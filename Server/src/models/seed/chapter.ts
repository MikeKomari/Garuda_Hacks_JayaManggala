import { prisma } from "../../config/config";

export async function seedChapter() {
  try {
    const jawaStory = await prisma.story.findFirst({
      where: {
        title: "Introduction to Javanese",
        region: {
          name: "Jawa",
        },
      },
    });
    
    if (!jawaStory)
      throw new Error(
        "Introduction to Javanese story not found. Please seed stories first."
      );

    const chapters = [
      {
        title: "Chapter 1: Basic Greetings",
        storyId: jawaStory.id,
        chapterOrder: 1,
      },
      {
        title: "Chapter 2: Introductions",
        storyId: jawaStory.id,
        chapterOrder: 2,
      },
    ];

    for (const chapter of chapters) {
      await prisma.chapter.create({
        data: {
          title: chapter.title,
          storyId: chapter.storyId,
          chapterOrder: chapter.chapterOrder,
          unlocked: chapter.chapterOrder === 1,
        },
      });
    }

    console.log("Chapter seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding chapter data:", error);
  }
}
