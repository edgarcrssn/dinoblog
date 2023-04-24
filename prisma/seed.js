import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const dinosaurs = [
    {
      name: 'Tyrannosaurus Rex',
      height: 20,
      length: 40,
      weight: 8000,
      era: 'CRETACEOUS',
      diet: 'CARNIVORE',
      description: 'One of the largest meat-eating dinosaurs that ever lived.',
    },
    {
      name: 'Velociraptor',
      height: 1.8,
      length: 2.4,
      weight: 15,
      era: 'CRETACEOUS',
      diet: 'CARNIVORE',
      description: 'A small, agile dinosaur that hunted in packs.',
    },
    {
      name: 'Stegosaurus',
      height: 4,
      length: 9,
      weight: 2500,
      era: 'JURASSIC',
      diet: 'HERBIVORE',
      description:
        'A heavily-armored dinosaur with distinctive plates on its back.',
    },
    {
      name: 'Triceratops',
      height: 3,
      length: 9,
      weight: 12000,
      era: 'CRETACEOUS',
      diet: 'HERBIVORE',
      description:
        'A large, three-horned dinosaur with a bony frill around its neck.',
    },
    {
      name: 'Brachiosaurus',
      height: 25,
      length: 85,
      weight: 88000,
      era: 'JURASSIC',
      diet: 'HERBIVORE',
      description: 'A huge, long-necked dinosaur that lived in the forests.',
    },
    {
      name: 'Dilophosaurus',
      height: 2.4,
      length: 6,
      weight: 500,
      era: 'JURASSIC',
      diet: 'CARNIVORE',
      description:
        'A fast-running dinosaur with a distinctive pair of crests on its head.',
    },
    {
      name: 'Ankylosaurus',
      height: 1.5,
      length: 9,
      weight: 5500,
      era: 'CRETACEOUS',
      diet: 'HERBIVORE',
      description: 'A heavily-armored dinosaur with a club-like tail.',
    },
    {
      name: 'Allosaurus',
      height: 3.5,
      length: 12,
      weight: 2500,
      era: 'JURASSIC',
      diet: 'CARNIVORE',
      description: 'A large, powerful dinosaur with sharp teeth and claws.',
    },
    {
      name: 'Iguanodon',
      height: 4.5,
      length: 10,
      weight: 4000,
      era: 'CRETACEOUS',
      diet: 'HERBIVORE',
      description:
        'A large, herbivorous dinosaur with a distinctive thumb spike.',
    },
    {
      name: 'Spinosaurus',
      height: 5,
      length: 18,
      weight: 9500,
      era: 'CRETACEOUS',
      diet: 'CARNIVORE',
      description:
        'A huge, sail-backed dinosaur that hunted fish in the rivers.',
    },
    {
      name: 'Pterodactyl',
      height: 1.2,
      length: 1.8,
      weight: 2,
      era: 'JURASSIC',
      diet: 'CARNIVORE',
      description: 'A flying reptile with wings made of skin.',
    },
    {
      name: 'Brontosaurus',
      height: 15,
      length: 25,
      weight: 35000,
      era: 'JURASSIC',
      diet: 'HERBIVORE',
      description:
        'A long-necked dinosaur with a small head and a whip-like tail.',
    },
  ];

  for (const dinosaur of dinosaurs) {
    await prisma.dinosaur.upsert({
      where: { name: dinosaur.name },
      update: {},
      create: dinosaur,
    });
  }

  console.log('Inserted 12 dinosaurs!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
