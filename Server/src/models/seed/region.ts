import { prisma } from "../../config/config";

export async function seedRegion() {
  try {
    const regions = [
      { name: "Jawa" },
      { name: "Sumatera" },
      { name: "Kalimantan" },
      { name: "Sulawesi" },
      { name: "Papua" },
      { name: "Bali" },
      { name: "Nusa Tenggara" },
      { name: "Maluku" },
      { name: "Kepulauan Riau" },
      { name: "Bangka Belitung" },
      { name: "Aceh" },
      { name: "Banten" },
      { name: "DKI Jakarta" },
      { name: "Jambi" },
      { name: "Lampung" },
      { name: "Bengkulu" },
      { name: "Riau" },
      { name: "Kepulauan Bangka Belitung" },
      { name: "Kalimantan Barat" },
      { name: "Kalimantan Tengah" },
      { name: "Kalimantan Selatan" },
      { name: "Kalimantan Timur" },
      { name: "Kalimantan Utara" },
      { name: "Sulawesi Utara" },
      { name: "Sulawesi Tengah" },
      { name: "Sulawesi Selatan" },
      { name: "Sulawesi Tenggara" },
      { name: "Gorontalo" },
      { name: "Maluku Utara" },
      { name: "Papua Barat" },
    ];

    for (const region of regions) {
      await prisma.region.create({
        data: {
          name: region.name,
        },
      });
    }

    console.log("Region seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding region data:", error);
  }
}
