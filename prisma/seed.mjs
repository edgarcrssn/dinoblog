import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const getImageBuffer = (fileName) => {
  const imageFilePath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    `images/${fileName}`
  );

  const imageBuffer = fs.readFileSync(imageFilePath);

  return imageBuffer;
};

async function main() {
  const adminPass = process.env.ADMIN_PASSWORD;
  if (!adminPass) {
    console.error('ADMIN_PASSWORD not found');
    return;
  }
  const user = await prisma.user.upsert({
    where: {
      username: 'admin',
    },
    update: {},
    create: {
      username: 'admin',
      password: await bcrypt.hash(adminPass, 10),
      role: 'ADMIN',
    },
  });

  const dinosaurs = [
    {
      name: 'tyrannosaurus-rex',
      height: 20,
      length: 40,
      weight: 8000,
      era: 'CRETACEOUS',
      diet: 'CARNIVORE',
      description: 'One of the largest meat-eating dinosaurs that ever lived.',
      image: getImageBuffer('tyrannosaurus-rex.jpg'),
      comments: {
        create: {
          authorId: user.id,
          content: "C'est mon dinosaure préféré!",
        },
      },
    },
    {
      name: 'velociraptor',
      height: 1.8,
      length: 2.4,
      weight: 15,
      era: 'CRETACEOUS',
      diet: 'CARNIVORE',
      description: 'A small, agile dinosaur that hunted in packs.',
      image: getImageBuffer('velociraptor.jpg'),
    },
    {
      name: 'stegosaurus',
      height: 4,
      length: 9,
      weight: 2500,
      era: 'JURASSIC',
      diet: 'HERBIVORE',
      description:
        'A heavily-armored dinosaur with distinctive plates on its back.',
      image: getImageBuffer('stegosaurus.jpg'),
    },
    {
      name: 'triceratops',
      height: 3,
      length: 9,
      weight: 12000,
      era: 'CRETACEOUS',
      diet: 'HERBIVORE',
      description:
        'A large, three-horned dinosaur with a bony frill around its neck.',
      image: getImageBuffer('triceratops.jpg'),
    },
    {
      name: 'brachiosaurus',
      height: 25,
      length: 85,
      weight: 88000,
      era: 'JURASSIC',
      diet: 'HERBIVORE',
      description: 'A huge, long-necked dinosaur that lived in the forests.',
      image: getImageBuffer('brachiosaurus.jpg'),
    },
    {
      name: 'dilophosaurus',
      height: 2.4,
      length: 6,
      weight: 500,
      era: 'JURASSIC',
      diet: 'CARNIVORE',
      description:
        'A fast-running dinosaur with a distinctive pair of crests on its head.',
      image: getImageBuffer('dilophosaurus.jpg'),
    },
    {
      name: 'ankylosaurus',
      height: 1.5,
      length: 9,
      weight: 5500,
      era: 'CRETACEOUS',
      diet: 'HERBIVORE',
      description: 'A heavily-armored dinosaur with a club-like tail.',
      image: getImageBuffer('ankylosaurus.jpg'),
    },
    {
      name: 'allosaurus',
      height: 3.5,
      length: 12,
      weight: 2500,
      era: 'JURASSIC',
      diet: 'CARNIVORE',
      description: 'A large, powerful dinosaur with sharp teeth and claws.',
      image: getImageBuffer('allosaurus.jpg'),
    },
    {
      name: 'iguanodon',
      height: 4.5,
      length: 10,
      weight: 4000,
      era: 'CRETACEOUS',
      diet: 'HERBIVORE',
      description:
        'A large, herbivorous dinosaur with a distinctive thumb spike.',
      image: getImageBuffer('iguanodon.jpg'),
    },
    {
      name: 'spinosaurus',
      height: 5,
      length: 18,
      weight: 9500,
      era: 'CRETACEOUS',
      diet: 'CARNIVORE',
      description:
        'A huge, sail-backed dinosaur that hunted fish in the rivers.',
      image: getImageBuffer('spinosaurus.jpg'),
    },
    {
      name: 'pterodactyl',
      height: 1.2,
      length: 1.8,
      weight: 2,
      era: 'JURASSIC',
      diet: 'CARNIVORE',
      description: 'A flying reptile with wings made of skin.',
      image: getImageBuffer('pterodactyl.jpg'),
    },
    {
      name: 'brontosaurus',
      height: 15,
      length: 25,
      weight: 35000,
      era: 'JURASSIC',
      diet: 'HERBIVORE',
      description:
        'A long-necked dinosaur with a small head and a whip-like tail.',
      image: getImageBuffer('brontosaurus.jpg'),
    },
  ];

  for (const dinosaur of dinosaurs) {
    await prisma.dinosaur.upsert({
      where: { name: dinosaur.name },
      update: {},
      create: dinosaur,
    });
  }

  console.log('db init done!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
