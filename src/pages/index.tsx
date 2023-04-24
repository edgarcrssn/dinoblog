import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.scss';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [dinosaurs, setDinosaurs] = useState([]);

  return (
    <>
      <Head>
        <title>Dinoblog 🦕</title>
        <meta name="description" content="A blog about dinosaurs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>All dinosaurs</h1>
        <div className={styles.dinosaursContainer}>
          {dinosaurs.length ? (
            <div>Ok</div>
          ) : (
            <div className={styles.noDinosaurMessage}>
              Oups, there is no dinosaur for the moment...
            </div>
          )}
        </div>
      </main>
    </>
  );
}
