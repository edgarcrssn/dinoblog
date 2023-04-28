import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Dinosaurs.module.scss';
import { Diet, Era, PrismaClient } from '@prisma/client';
import { bufferToImgSrc } from '@/utils/bufferToImgSrc';
import { GetStaticProps } from 'next';
import DinosaursFilterBar from '../../components/DinosaursFilterBar/DinosaursFilterBar';
import { useState } from 'react';
import DinosaursGrid from '@/components/DinosaursGrid/DinosaursGrid';

const inter = Inter({ subsets: ['latin'] });

export type Dinosaur = {
  name: string;
  description: string;
  image: string;
  diet?: Diet;
  era?: Era;
  createdAt?: string;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const prisma = new PrismaClient();
  const dinosaurs = await prisma.dinosaur.findMany({
    select: {
      name: true,
      description: true,
      image: true,
      diet: true,
      era: true,
      createdAt: true,
    },
  });

  const formattedDinosaurs = dinosaurs.map((dinosaur) => ({
    ...dinosaur,
    createdAt: dinosaur.createdAt.toISOString(),
    image: bufferToImgSrc(Buffer.from(dinosaur.image)),
  }));

  await prisma.$disconnect();

  return {
    props: { dinosaurs: formattedDinosaurs },
  };
};

interface Props {
  dinosaurs: Dinosaur[];
}

const Home = ({ dinosaurs }: Props) => {
  const [nameFilter, setNameFilter] = useState('');
  const [dietFilter, setDietFilter] = useState<string | undefined>();
  const [eraFilter, setEraFilter] = useState<string | undefined>();

  dinosaurs = dinosaurs
    .filter((dinosaur) => dinosaur.name.includes(nameFilter))
    .filter((dinosaur) => {
      if (dietFilter) return dinosaur.diet === dietFilter;
      return true;
    })
    .filter((dinosaur) => {
      if (eraFilter) return dinosaur.era === eraFilter;
      return true;
    });

  return (
    <>
      <Head>
        <title>All dinosaurs 🦖</title>
        <meta name="description" content="All the dinosaurs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1 className={styles.title}>Learn more about dinosaurs</h1>
        <DinosaursFilterBar
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          dietFilter={dietFilter}
          setDietFilter={setDietFilter}
          eraFilter={eraFilter}
          setEraFilter={setEraFilter}
        />
        <DinosaursGrid dinosaurs={dinosaurs} />
      </main>
    </>
  );
};

export default Home;
