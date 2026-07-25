import "dotenv/config";

import { PrismaClient, Category } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {

  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [

      {
        inventoryCode: "KAR-001",
        name: "Karategui Katana",
        brand: "Katana",
        category: Category.KARATE,
        description: "Uniforme profesional de Karate",
        price: 300000,
        stock: 10,
        sizes: ["S","M","L","XL"],
        imageUrl: "/images/karategui.jpg"
      },

      {
        inventoryCode: "CIC-001",
        name: "Uniforme Ciclismo Completo",
        brand: "TARS Sport",
        category: Category.CYCLING,
        description: "Uniforme completo de ciclismo",
        price: 300000,
        stock: 8,
        sizes: ["S","M","L"],
        imageUrl: "/images/ciclismo.jpg"
      },

      {
        inventoryCode: "NAT-001",
        name: "Vestido de baño Dama",
        brand: "TARS Sport",
        category: Category.SWIMMING,
        description: "Vestido de baño deportivo",
        price: 120000,
        stock: 12,
        sizes: ["S","M","L"],
        imageUrl: "/images/natacion.jpg"
      }

    ]
  });

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });