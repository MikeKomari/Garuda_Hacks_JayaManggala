import { Role } from "@prisma/client";
import { prisma } from "../../config/config";
import bcrypt from "bcrypt";

export async function seedUser() {
  try {
    const adminUser = [
      {
        data: {
          email: "admin@gmail.com",
          name: "Admin User",
          password: await bcrypt.hash("admin123", 10),
          username: "superadmin",
          role: Role.Admin,
          age: 18,
        },
      },
    ];

    for (const admin of adminUser) {
      await prisma.user.create(admin);
    }

    console.log("User seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding user data:", error);
  }
}
