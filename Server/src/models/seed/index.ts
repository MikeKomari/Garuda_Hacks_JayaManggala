import { seedChapter } from "./chapter";
import { seedQuestion } from "./question";
import { seedRegion } from "./region";
import { seedStory } from "./story";
import { seedSubChapter } from "./subchapter";
import { seedUser } from "./user";
import { seedVocabulary } from "./vocab";

async function seed() {
  await seedUser();
  await seedRegion();
  await seedStory();
  await seedVocabulary();
  await seedChapter();
  await seedSubChapter();
  await seedQuestion();
}

seed();
