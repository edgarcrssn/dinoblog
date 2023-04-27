import { Diet, Era, PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import { bufferToImgSrc } from '@/utils/bufferToImgSrc';
import { formatName } from '@/utils/formatName';
import Grid from '@/components/Grid/Grid';
import { Card } from 'antd';
import styles from '@/styles/Dinosaur.module.scss';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { capitalize } from '@/utils/capitalize';
import DinosaursGrid from '@/components/DinosaursGrid/DinosaursGrid';
import CommentsSection from '@/components/CommentsSection/CommentsSection';

const inter = Inter({ subsets: ['latin'] });

interface Params extends ParsedUrlQuery {
  dinosaur: string;
}

export interface CommentI {
  content: string;
  author: {
    username: string;
  };
  postedAt: string;
}

interface Props {
  dinosaur: {
    id: number;
    createdAt: string;
    name: string;
    height: number;
    length: number;
    weight: number;
    era: Era;
    diet: Diet;
    description: string;
    image: string;
    comments: CommentI[];
  };
  commentsCount: number;
  dinosaursWithSameDiet: {
    name: string;
    image: string;
    description: string;
  }[];
  dinosaursFromSameEra: {
    name: string;
    image: string;
    description: string;
  }[];
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const { dinosaur } = params as Params;

  const prisma = new PrismaClient();

  const dinosaurFound = await prisma.dinosaur.findUnique({
    where: {
      name: dinosaur,
    },
    include: {
      comments: {
        take: 3,
        orderBy: {
          postedAt: 'desc',
        },
        select: {
          postedAt: true,
          content: true,
          author: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });
  if (!dinosaurFound) {
    await prisma.$disconnect();
    return {
      notFound: true,
    };
  }
  const commentsCount = await prisma.comment.count({
    where: {
      dinosaur: {
        name: dinosaur,
      },
    },
  });
  const formattedDinosaur = {
    ...dinosaurFound,
    createdAt: dinosaurFound.createdAt.toISOString(),
    image: bufferToImgSrc(Buffer.from(dinosaurFound.image)),
    comments: dinosaurFound.comments.map((comment) => ({
      ...comment,
      postedAt: comment.postedAt.toISOString(),
    })),
  };

  const dinosaursWithSameDiet = await prisma.dinosaur.findMany({
    where: {
      diet: dinosaurFound.diet,
      name: {
        not: dinosaurFound.name,
      },
    },
    select: {
      name: true,
      image: true,
      description: true,
    },
    take: 3,
  });
  const formattedDinosaursWithSameDiet = dinosaursWithSameDiet.map(
    (dinosaur) => ({
      ...dinosaur,
      image: bufferToImgSrc(Buffer.from(dinosaur.image)),
    })
  );

  const dinosaursFromSameEra = await prisma.dinosaur.findMany({
    where: {
      era: dinosaurFound.era,
      name: {
        not: dinosaurFound.name,
        notIn: dinosaursWithSameDiet.map((dinosaur) => dinosaur.name),
      },
    },
    select: {
      name: true,
      image: true,
      description: true,
    },
    take: 3,
  });
  const formattedDinosaursFromSameEra = dinosaursFromSameEra.map(
    (dinosaur) => ({
      ...dinosaur,
      image: bufferToImgSrc(Buffer.from(dinosaur.image)),
    })
  );

  await prisma.$disconnect();

  return {
    props: {
      dinosaur: formattedDinosaur,
      commentsCount,
      dinosaursWithSameDiet: formattedDinosaursWithSameDiet,
      dinosaursFromSameEra: formattedDinosaursFromSameEra,
    },
  };
};

const Dinosaur = ({
  dinosaur,
  commentsCount,
  dinosaursWithSameDiet,
  dinosaursFromSameEra,
}: Props) => {
  const getDescriptionFromDiet = () => {
    switch (dinosaur.diet) {
      case Diet.CARNIVORE:
        return 'Mammal characterized by a very developed dentition, which feeds essentially on meat.';
      case Diet.HERBIVORE:
        return 'Said of a vertebrate that feeds on grasses and low plants.';
      case Diet.OMNIVORE:
        return 'Who feeds indifferently on food of animal or vegetable origin.';
      default:
        return '';
    }
  };

  const getDescriptionFromEra = () => {
    switch (dinosaur.era) {
      case Era.CRETACEOUS:
        return 'The Cretaceous is a geological period that extends from about -145.0 to -66.0 Ma. It ends with the disappearance of non-avian dinosaurs, pterosaurs, most marine reptiles, ammonites and many other life forms.';
      case Era.JURASSIC:
        return 'The Jurassic is a geological period that extends from 201.3 to 145 million years ago (Ma). The Jurassic is the period, or intermediate system, of the Mesozoic Era, which is also known as the "Age of Reptiles".';
      case Era.TRIASSIC:
        return 'The Triassic is a geologic period and system which spans 50.6 million years from the end of the Permian Period 251.902 million years ago (Mya), to the beginning of the Jurassic Period 201.36 Mya. The Triassic is the first and shortest period of the Mesozoic Era.';
      default:
        return '';
    }
  };

  return (
    <>
      <Head>
        <title>{formatName(dinosaur.name)}</title>
        <meta name="description" content={dinosaur.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>{formatName(dinosaur.name)}</h1>
        <Image
          className={styles.image}
          width={400}
          height={400}
          src={dinosaur.image}
          alt={`Representation of a ${formatName(dinosaur.name)}`}
        />
        <p>{dinosaur.description}</p>
        <Grid>
          {[
            { title: 'Height', value: dinosaur.height, unit: 'meters' },
            { title: 'Length', value: dinosaur.length, unit: 'meters' },
            { title: 'Weight', value: dinosaur.weight, unit: 'kilograms' },
          ].map((item) => (
            <Card key={item.title} title={item.title}>
              <div className={styles.cardContent}>
                <span className={styles.value}>{item.value}</span>
                <span className={styles.unit}>{item.unit}</span>
              </div>
            </Card>
          ))}
        </Grid>
        <Grid size="narrow">
          {[
            {
              title: 'Diet',
              value: capitalize(dinosaur.diet),
              description: getDescriptionFromDiet(),
            },
            {
              title: 'Era',
              value: capitalize(dinosaur.era),
              description: getDescriptionFromEra(),
            },
          ].map((item) => (
            <Card key={item.title} title={item.title}>
              <div className={styles.cardContent}>
                <span className={styles.value}>{item.value}</span>
                <span className={styles.unit}>{item.description}</span>
              </div>
            </Card>
          ))}
        </Grid>
        <CommentsSection
          comments={dinosaur.comments}
          commentsCount={commentsCount}
        />
        <section>
          <h2 className={styles.subtitle}>
            More {dinosaur.diet.toLowerCase()}s dinosaurs
          </h2>
          <DinosaursGrid dinosaurs={dinosaursWithSameDiet} />
        </section>
        <section>
          <h2 className={styles.subtitle}>
            More dinosaurs from the {capitalize(dinosaur.era)} era
          </h2>
          <DinosaursGrid dinosaurs={dinosaursFromSameEra} />
        </section>
      </main>
    </>
  );
};

export default Dinosaur;
