import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.scss';
import { PrismaClient } from '@prisma/client';
import { bufferToImgSrc } from '@/utils/bufferToImgSrc';
import { GetStaticProps } from 'next';
import DinosaursFilterBar from '../components/DinosaursFilterBar/DinosaursFilterBar';
import { useState } from 'react';
import DinoCard from '../components/DinoCard/DinoCard';
import Grid from '@/components/Grid/Grid';

const inter = Inter({ subsets: ['latin'] });

export type Dinosaur = {
  id: number;
  createdAt: string;
  name: string;
  height: number;
  length: number;
  weight: number;
  era: string;
  diet: string;
  description: string;
  image: string;
};

interface Props {
  dinosaurs: Dinosaur[];
}

export default function Home({ dinosaurs }: Props) {
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
        <title>Dinoblog 🦕</title>
        <meta name="description" content="A blog about dinosaurs" />
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
        {dinosaurs.length ? (
          <Grid>
            {dinosaurs.map((dinosaur) => (
              <DinoCard key={dinosaur.id} dinosaur={dinosaur} />
            ))}
          </Grid>
        ) : (
          <span>Oups, no dinosaur found!</span>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const prisma = new PrismaClient();
  const dinosaurs = await prisma.dinosaur.findMany();

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
