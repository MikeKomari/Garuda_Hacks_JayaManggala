import { seedRegion } from "./region";
import { seedUser } from "./user";

async function seed() {
  seedUser();
  seedRegion();
  
}

seed();
