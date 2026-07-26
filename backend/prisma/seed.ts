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

      // ============================
      // KARATE
      // ============================

      {
        inventoryCode: "KAR-001",
        name: "Karategui Katana",
        brand: "Katana",
        category: Category.KARATE,
        description: "Uniforme profesional de karate 100% algodón.",
        price: 300000,
        stock: 10,
        sizes: ["S", "M", "L", "XL"],
        imageUrl: "/images/karate/karategui.jpg",
      },
      {
        inventoryCode: "KAR-002",
        name: "Cinturón Blanco",
        brand: "Katana",
        category: Category.KARATE,
        description: "Cinturón para principiantes.",
        price: 25000,
        stock: 30,
        sizes: ["240", "260", "280", "300"],
        imageUrl: "/images/karate/cinturon-blanco.jpg",
      },
      {
        inventoryCode: "KAR-003",
        name: "Cinturón Negro",
        brand: "Katana",
        category: Category.KARATE,
        description: "Cinturón de alta resistencia.",
        price: 60000,
        stock: 20,
        sizes: ["260", "280", "300"],
        imageUrl: "/images/karate/cinturon-negro.jpg",
      },
      {
        inventoryCode: "KAR-004",
        name: "Guantes Kumite",
        brand: "Daedo",
        category: Category.KARATE,
        description: "Guantes homologados para competencia.",
        price: 90000,
        stock: 15,
        sizes: ["S", "M", "L"],
        imageUrl: "/images/karate/guantes.jpg",
      },
      {
        inventoryCode: "KAR-005",
        name: "Protector Bucal",
        brand: "Daedo",
        category: Category.KARATE,
        description: "Protector bucal de doble densidad.",
        price: 35000,
        stock: 40,
        sizes: ["Única"],
        imageUrl: "/images/karate/protector-bucal.jpg",
      },
      {
        inventoryCode: "KAR-006",
        name: "Espinilleras",
        brand: "Daedo",
        category: Category.KARATE,
        description: "Protección para entrenamiento y competencia.",
        price: 120000,
        stock: 12,
        sizes: ["S", "M", "L"],
        imageUrl: "/images/karate/espinilleras.jpg",
      },

      // ============================
      // CICLISMO
      // ============================

      {
        inventoryCode: "CIC-001",
        name: "Uniforme Ciclismo Completo",
        brand: "TARS Sport",
        category: Category.CYCLING,
        description: "Uniforme completo para ruta.",
        price: 300000,
        stock: 8,
        sizes: ["S", "M", "L"],
        imageUrl: "/images/cycling/uniforme.jpg",
      },
      {
        inventoryCode: "CIC-002",
        name: "Casco MTB",
        brand: "GW",
        category: Category.CYCLING,
        description: "Casco ligero con certificación.",
        price: 280000,
        stock: 10,
        sizes: ["M", "L"],
        imageUrl: "/images/cycling/casco.jpg",
      },
      {
        inventoryCode: "CIC-003",
        name: "Guantes Ciclismo",
        brand: "GW",
        category: Category.CYCLING,
        description: "Guantes con gel antideslizante.",
        price: 65000,
        stock: 20,
        sizes: ["S", "M", "L"],
        imageUrl: "/images/cycling/guantes.jpg",
      },
      {
        inventoryCode: "CIC-004",
        name: "Gafas Deportivas",
        brand: "Rockbros",
        category: Category.CYCLING,
        description: "Protección UV para ciclismo.",
        price: 150000,
        stock: 15,
        sizes: ["Única"],
        imageUrl: "/images/cycling/gafas.jpg",
      },
      {
        inventoryCode: "CIC-005",
        name: "Caramañola",
        brand: "GW",
        category: Category.CYCLING,
        description: "Botella deportiva de 750 ml.",
        price: 30000,
        stock: 35,
        sizes: ["750ml"],
        imageUrl: "/images/cycling/caramanola.jpg",
      },
      {
        inventoryCode: "CIC-006",
        name: "Luces LED",
        brand: "Rockbros",
        category: Category.CYCLING,
        description: "Juego de luces delantera y trasera.",
        price: 85000,
        stock: 18,
        sizes: ["Única"],
        imageUrl: "/images/cycling/luces.jpg",
      },
      {
        inventoryCode: "CIC-007",
        name: "Jersey Manga Larga",
        brand: "TARS Sport",
        category: Category.CYCLING,
        description: "Jersey térmico para clima frío.",
        price: 180000,
        stock: 12,
        sizes: ["S", "M", "L", "XL"],
        imageUrl: "/images/cycling/jersey.jpg",
      },

      // ============================
      // NATACIÓN
      // ============================

      {
        inventoryCode: "NAT-001",
        name: "Vestido de Baño Dama",
        brand: "TARS Sport",
        category: Category.SWIMMING,
        description: "Vestido de baño deportivo.",
        price: 120000,
        stock: 12,
        sizes: ["S", "M", "L"],
        imageUrl: "/images/swimming/dama.jpg",
      },
      {
        inventoryCode: "NAT-002",
        name: "Pantaloneta Hombre",
        brand: "TARS Sport",
        category: Category.SWIMMING,
        description: "Pantaloneta para entrenamiento.",
        price: 110000,
        stock: 15,
        sizes: ["S", "M", "L", "XL"],
        imageUrl: "/images/swimming/hombre.jpg",
      },
      {
        inventoryCode: "NAT-003",
        name: "Gafas Natación",
        brand: "Speedo",
        category: Category.SWIMMING,
        description: "Lentes antiempañantes.",
        price: 75000,
        stock: 25,
        sizes: ["Única"],
        imageUrl: "/images/swimming/gafas.jpg",
      },
      {
        inventoryCode: "NAT-004",
        name: "Gorro de Silicona",
        brand: "Speedo",
        category: Category.SWIMMING,
        description: "Gorro de alta elasticidad.",
        price: 35000,
        stock: 30,
        sizes: ["Única"],
        imageUrl: "/images/swimming/gorro.jpg",
      },
      {
        inventoryCode: "NAT-005",
        name: "Aletas de Entrenamiento",
        brand: "Speedo",
        category: Category.SWIMMING,
        description: "Aletas para mejorar la técnica.",
        price: 220000,
        stock: 10,
        sizes: ["38", "40", "42", "44"],
        imageUrl: "/images/swimming/aletas.jpg",
      },
      {
        inventoryCode: "NAT-006",
        name: "Tabla de Flotación",
        brand: "Speedo",
        category: Category.SWIMMING,
        description: "Tabla EVA para entrenamiento.",
        price: 90000,
        stock: 18,
        sizes: ["Única"],
        imageUrl: "/images/swimming/tabla.jpg",
      },

    ],
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