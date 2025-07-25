import { prisma } from "../../config/config";

export async function seedQuestion() {
  try {
    const subChapter1 = await prisma.subChapter.findFirst({
      where: {
        title: "Introduction to Javanese",
        chapter: {
          title: "Chapter 1: Basic Greetings",
        },
      },
    });

    const subChapter2 = await prisma.subChapter.findFirst({
      where: {
        title: "Basic Speaking in Javanese",
        chapter: {
          title: "Chapter 1: Basic Greetings",
        },
      },
    });

    if (!subChapter1 || !subChapter2)
      throw new Error("SubChapters not found. Please seed subChapters first.");

    const jawaRegion = await prisma.region.findUnique({
      where: {
        name: "Jawa",
      },
    });

    if (!jawaRegion)
      throw new Error("Jawa region not found. Please seed regions first.");

    const questions = [
      {
        text: "What is 'Hello' in Javanese?",
        type: "Text",
        subChapterId: subChapter1.id,
        questionOrder: 1,
        answers: [
          { text: "Sugeng", isCorrect: true },
          { text: "Apa", isCorrect: false },
          { text: "Kabar", isCorrect: false },
          { text: "Salam", isCorrect: false },
        ],
        vocab: [
          {
            vocabText: "Sugeng",
            translatedText: "Hello/Welcome",
            pronouncation: "Su-geng",
          },
        ],
      },
      {
        text: "Say 'Thank you' in Javanese",
        type: "Speech",
        subChapterId: subChapter1.id,
        questionOrder: 2,
        answers: [{ text: "Matur Nuwun", isCorrect: true }],
        vocab: [
          {
            vocabText: "Matur Nuwun",
            translatedText: "Thank you",
            pronouncation: "Ma-tur Nu-wun",
          },
        ],
      },
      {
        text: "What is the Javanese word for 'Welcome'?",
        type: "Text",
        subChapterId: subChapter1.id,
        questionOrder: 3,
        answers: [
          { text: "Sugeng", isCorrect: true },
          { text: "Piye", isCorrect: false },
          { text: "Kowe", isCorrect: false },
          { text: "Jenengku", isCorrect: false },
        ],
      },
      {
        text: "Choose the correct pronouncation for 'Sugeng'",
        type: "Text",
        subChapterId: subChapter1.id,
        questionOrder: 4,
        answers: [
          { text: "Su-geng", isCorrect: true },
          { text: "So-geng", isCorrect: false },
          { text: "Su-gang", isCorrect: false },
          { text: "Si-geng", isCorrect: false },
        ],
      },
      {
        text: "What does 'Matur Nuwun' mean?",
        type: "Text",
        subChapterId: subChapter1.id,
        questionOrder: 5,
        answers: [
          { text: "Thank you", isCorrect: true },
          { text: "Hello", isCorrect: false },
          { text: "Goodbye", isCorrect: false },
          { text: "Please", isCorrect: false },
        ],
      },
      {
        text: "What is 'How are you' in Javanese?",
        type: "Text",
        subChapterId: subChapter2.id,
        questionOrder: 1,
        answers: [
          { text: "Apa Kabar", isCorrect: true },
          { text: "Sugeng", isCorrect: false },
          { text: "Jenengku", isCorrect: false },
          { text: "Piye", isCorrect: false },
        ],
        vocab: [
          {
            vocabText: "Apa Kabar",
            translatedText: "How are you",
            pronouncation: "A-pa Ka-bar",
          },
        ],
      },
      {
        text: "Say 'My name is' in Javanese",
        type: "Speech",
        subChapterId: subChapter2.id,
        questionOrder: 2,
        answers: [{ text: "Jenengku", isCorrect: true }],
        vocab: [
          {
            vocabText: "Jenengku",
            translatedText: "My name is",
            pronouncation: "Je-neng-ku",
          },
        ],
      },
      {
        text: "What is 'You' in Javanese?",
        type: "Text",
        subChapterId: subChapter2.id,
        questionOrder: 3,
        answers: [
          { text: "Kowe", isCorrect: true },
          { text: "Aku", isCorrect: false },
          { text: "Piye", isCorrect: false },
          { text: "Apa", isCorrect: false },
        ],
        vocab: [
          { vocabText: "Kowe", translatedText: "You", pronouncation: "Ko-we" },
        ],
      },
      {
        text: "Choose the correct pronouncation for 'Piye'",
        type: "Text",
        subChapterId: subChapter2.id,
        questionOrder: 4,
        answers: [
          { text: "Pi-ye", isCorrect: true },
          { text: "Pe-ye", isCorrect: false },
          { text: "Pi-ya", isCorrect: false },
          { text: "Pa-ye", isCorrect: false },
        ],
      },
      {
        text: "What does 'Apa Kabar' mean?",
        type: "Text",
        subChapterId: subChapter2.id,
        questionOrder: 5,
        answers: [
          { text: "How are you", isCorrect: true },
          { text: "What is it", isCorrect: false },
          { text: "Good morning", isCorrect: false },
          { text: "Thank you", isCorrect: false },
        ],
      },
      {
        text: "What is 'How' in Javanese?",
        type: "Text",
        subChapterId: subChapter2.id,
        questionOrder: 6,
        answers: [
          { text: "Piye", isCorrect: true },
          { text: "Apa", isCorrect: false },
          { text: "Kowe", isCorrect: false },
          { text: "Sugeng", isCorrect: false },
        ],
        vocab: [
          { vocabText: "Piye", translatedText: "How", pronouncation: "Pi-ye" },
        ],
      },
      {
        text: "Say 'How are you' in Javanese",
        type: "Speech",
        subChapterId: subChapter2.id,
        questionOrder: 7,
        answers: [{ text: "Apa Kabar", isCorrect: true }],
      },
      {
        text: "What is the Javanese word for 'My name is'?",
        type: "Text",
        subChapterId: subChapter2.id,
        questionOrder: 8,
        answers: [
          { text: "Jenengku", isCorrect: true },
          { text: "Kowe", isCorrect: false },
          { text: "Apa", isCorrect: false },
          { text: "Piye", isCorrect: false },
        ],
      },
      {
        text: "Choose the correct pronouncation for 'Kowe'",
        type: "Text",
        subChapterId: subChapter2.id,
        questionOrder: 9,
        answers: [
          { text: "Ko-we", isCorrect: true },
          { text: "Ku-we", isCorrect: false },
          { text: "Ko-wa", isCorrect: false },
          { text: "Ka-we", isCorrect: false },
        ],
      },
      {
        text: "What does 'Kowe' mean?",
        type: "Text",
        subChapterId: subChapter2.id,
        questionOrder: 10,
        answers: [
          { text: "You", isCorrect: true },
          { text: "I", isCorrect: false },
          { text: "He", isCorrect: false },
          { text: "She", isCorrect: false },
        ],
      },
    ];

    for (const question of questions) {
      await prisma.question.create({
        data: {
          text: question.text,
          type: question.type,
          subChapterId: question.subChapterId,
          questionOrder: question.questionOrder,
          answer: {
            create: question.answers.map((a) => ({
              text: a.text,
              isCorrect: a.isCorrect,
            })),
          },
          vocab: question.vocab
            ? {
                create: question.vocab.map((v) => ({
                  vocabText: v.vocabText,
                  translatedText: v.translatedText,
                  pronouncation: v.pronouncation,
                  regionId: jawaRegion.id,
                })),
              }
            : undefined,
        },
      });
    }

    console.log("Question seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding question data:", error);
  }
}
