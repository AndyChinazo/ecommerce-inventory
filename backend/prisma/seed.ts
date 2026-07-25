import { PrismaClient, Category } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  await prisma.product.deleteMany();

  await prisma.product.create({

    data: {

      inventoryCode: "KAR-001",

      name: "Karategui Katana",

      brand: "Katana",

      category: Category.KARATE,

      description: "Uniforme profesional para entrenamiento y competencia.",

      price: "300000.00",

      stock: 15,

      sizes: ["S", "M", "L", "XL"],

      imageUrl: "/images/karategui.jpg",

      active: true

    }

  });

  console.log("✅ Producto creado correctamente");

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