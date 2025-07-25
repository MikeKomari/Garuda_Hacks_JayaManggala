import {
  MembershipPlan,
  MembershipStatus,
  MembershipType,
  Role,
} from "@prisma/client";
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
    console.log("Admin user seeded successfully.");

    const userData = [
      {
        email: "john.doe@gmail.com",
        name: "John Doe",
        password: await bcrypt.hash("johndoe123", 10),
        username: "johndoe",
        role: Role.User,
        age: 25,
        hearts: 3,
        streak: 0,
        membership: {
          create: {
            status: MembershipStatus.Inactive,
            type: MembershipType.Free,
          },
        },
      },
      {
        email: "omjo@gmail.com",
        name: "Omjo",
        password: await bcrypt.hash("omjo1234", 10),
        username: "omjo",
        role: Role.User,
        age: 30,
        hearts: 5,
        streak: 3,
        membership: {
          create: {
            plan: MembershipPlan.OneMonth,
            status: MembershipStatus.Active,
            type: MembershipType.Premium,
          },
        },
      },
    ];

    for (const user of userData) {
      await prisma.user.create({
        data: user,
      });
    }

    console.log("User seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding user data:", error);
  }
}
